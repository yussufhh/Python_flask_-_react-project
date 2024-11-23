from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Apply CORS to allow requests from a specific origin
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Configurations for the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Update if using a different DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Email configuration using environment variables for security
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Use .env for email username
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Use .env for email password
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# Initialize database
db = SQLAlchemy(app)

# Define the User model with gender and county
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    course = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(20), nullable=False)  # Gender field
    county = db.Column(db.String(100), nullable=False)  # County field
    status = db.Column(db.String(20), default="Pending")  # New field for status (Pending, Accepted, Rejected)

# API to register a new user (signup)
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    course = data.get('course')
    gender = data.get('gender')  # Extract gender
    county = data.get('county')  # Extract county

    # Check if all fields are provided
    if not username or not email or not password or not course or not gender or not county:
        return jsonify({"error": "Username, email, password, course, gender, and county are required"}), 400

    # Check if the email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email is already registered"}), 400

    # Hash the password before storing it
    hashed_password = generate_password_hash(password)

    # Create new user
    new_user = User(username=username, email=email, password=hashed_password, course=course, gender=gender, county=county)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An error occurred while registering the user"}), 500

# API to handle user login
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "course": user.course,
            "gender": user.gender,  # Include gender
            "county": user.county   # Include county
        }
    }), 200

# API to fetch all users
@app.route('/api/auth/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "course": user.course,
        "gender": user.gender,
        "county": user.county,
        "status": user.status  # Include status
    } for user in users]

    return jsonify({"users": user_list}), 200

# Send email function
def send_email(recipient, subject, body):
    msg = Message(subject, sender=os.getenv('MAIL_USERNAME'), recipients=[recipient])
    msg.body = body
    try:
        mail.send(msg)
        print(f"Email sent to {recipient} with subject: {subject}")
    except Exception as e:
        print(f"Error sending email: {e}")

# API to accept a user
@app.route('/api/auth/users/<int:user_id>/accept', methods=['PUT', 'OPTIONS'])
def accept_user(user_id):
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight for accept request'}), 200

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Prevent processing if the user is not in "Pending" status
    if user.status != 'Pending':
        return jsonify({"error": "User has already been processed"}), 400

    user.status = 'Accepted'
    db.session.commit()

    # Send email notification for acceptance
    send_email(
        user.email,
        "Admission Accepted",
        f"Dear {user.username},\n\nCongratulations! You have been accepted for admission to the {user.course} course."
    )

    return jsonify({
        "message": "User accepted successfully",
        "user": {"id": user.id, "username": user.username, "status": user.status}
    }), 200

# API to reject a user
@app.route('/api/auth/users/<int:user_id>/reject', methods=['PUT', 'OPTIONS'])
def reject_user(user_id):
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight for reject request'}), 200

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Prevent processing if the user is not in "Pending" status
    if user.status != 'Pending':
        return jsonify({"error": "User has already been processed"}), 400

    user.status = 'Rejected'
    db.session.commit()

    # Send email notification for rejection
    send_email(
        user.email,
        "Registration Declined",
        f"Dear {user.username},\n\nWe regret to inform you that your application for the {user.course} course was not accepted."
    )

    return jsonify({
        "message": "User rejected successfully",
        "user": {"id": user.id, "username": user.username, "status": user.status}
    }), 200

# API to delete a user
@app.route('/api/auth/users/<int:user_id>', methods=['DELETE', 'OPTIONS'])
def delete_user(user_id):
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight for delete request'}), 200

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
