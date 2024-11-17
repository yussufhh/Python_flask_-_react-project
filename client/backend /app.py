from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
import os

# Initialize app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

# Initialize extensions
db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    profile_pic = db.Column(db.String(200), nullable=True)

    def __init__(self, username, email, password, profile_pic=None):
        self.username = username
        self.email = email
        self.password = password
        self.profile_pic = profile_pic

# User schema
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Helper function to check file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Create uploads folder if it doesn't exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Signup route
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username, email, hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify(user_schema.dump(new_user)), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Login route
@app.route('/api/auth/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Login successful", "user": user_schema.dump(user)}), 200
    return jsonify({"error": "Invalid email or password"}), 401

# Get profile
@app.route('/api/user/profile', methods=['GET'])
def get_profile():
    user_id = request.args.get('user_id')
    user = User.query.get(user_id)

    if user:
        return jsonify(user_schema.dump(user)), 200
    return jsonify({"error": "User not found"}), 404

# Update profile
@app.route('/api/user/profile', methods=['PUT'])
def update_profile():
    user_id = request.json.get('user_id')
    username = request.json.get('username')
    email = request.json.get('email')
    profile_pic = request.json.get('profile_pic')

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    if username:
        user.username = username
    if email:
        user.email = email
    if profile_pic:
        user.profile_pic = profile_pic

    try:
        db.session.commit()
        return jsonify(user_schema.dump(user)), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Upload profile picture
@app.route('/api/user/upload_picture', methods=['POST'])
def upload_picture():
    user_id = request.form.get('user_id')
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = os.path.join(app.config['UPLOAD_FOLDER'], f"{user_id}_{file.filename}")
        file.save(filename)

        user = User.query.get(user_id)
        if user:
            user.profile_pic = filename
            db.session.commit()
            return jsonify({"message": "Profile picture updated successfully", "profile_pic": filename}), 200
        return jsonify({"error": "User not found"}), 404
    return jsonify({"error": "Invalid file type"}), 400

# Run server
if __name__ == '__main__':
    app.run(debug=True)
