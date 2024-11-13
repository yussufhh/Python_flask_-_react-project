from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_bcrypt import Bcrypt
from flask_cors import CORS  # Import CORS

# Initialize app
app = Flask(__name__)

# Enable CORS for all domains (you can restrict to specific origins if needed)
CORS(app)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)

# Initialize Bcrypt
bcrypt = Bcrypt(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

# User schema using SQLAlchemyAutoSchema
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session

# Initialize user schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Create User route (Signup)
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    
    # Check if the email already exists in the database
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400
    
    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create new user
    new_user = User(username, email, hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()

        # Serialize the user data
        user_data = user_schema.dump(new_user)

        # Return the response as JSON
        return jsonify(user_data), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Login route
@app.route('/api/auth/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # Find the user by email
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        # Password matches, send a success response
        return jsonify({"message": "Login successful", "user": user_schema.dump(user)}), 200
    else:
        # Invalid credentials
        return jsonify({"error": "Invalid email or password"}), 401

# Run server
if __name__ == '__main__':
    app.run(debug=True)
