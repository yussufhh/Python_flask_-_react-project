from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import bcrypt
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

# Flask-Mail Configuration from environment variables
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)

# Mock user database (for demonstration purposes)
users_db = {
    'instructor@example.com': {
        'username': 'instructor123',
        'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        'role': 'instructor'
    }
}

# Endpoint to handle instructor registration
@app.route('/instructors', methods=['POST'])
def register_instructor():
    try:
        # Get the form data from the frontend
        data = request.json
        
        # Extract the data from the request
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        gender = data.get('gender')
        county = data.get('county')
        specialization = data.get('specialization')
        qualification = data.get('qualification')
        experience = data.get('experience')
        methodology = data.get('methodology')
        profile_picture = data.get('profilePicture')

        # Validate the received data
        if not username or not email or not password:
            return jsonify({"message": "Username, email, and password are required."}), 400

        # In a real application, save the data to a database and process the uploaded profile picture.

        # For now, mock saving data to the "database"
        users_db[email] = {
            'username': username,
            'password': bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
            'role': 'instructor'
        }

        # Send confirmation email
        msg = Message('Instructor Registration Successful',
                      recipients=[email])
        msg.body = f"Dear {username},\n\n  Congratulations! You have successfully applied for the position of Instructor at our institution.\n\n" \
                   f"We are thrilled to have you on board and we believe that your skills, experience, and dedication will make a significant impact. " \
                   f"Your area of specialization, {specialization}, will certainly bring great value to our learning community, and we look forward " \
                   f"to seeing how you can inspire and educate future generations of students.\n\n" \
                   f"If you have any questions or need assistance, please don’t hesitate to reach out to us.\n\n" \
                   f"Welcome aboard, {username}!\n\n" \
                   f"Best regards,\n" \
                   f"EduMaster Team"
        mail.send(msg)

        # Return success message
        return jsonify({"message": "Instructor registration successful!"}), 200

    except Exception as e:
        # Handle errors
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Endpoint to handle instructor login
@app.route('/api/auth/instructor/login', methods=['POST'])
def login_instructor():
    try:
        # Get the form data from the frontend
        data = request.json
        email = data.get('email')
        password = data.get('password')

        # Check if user exists in the mock "database"
        user = users_db.get(email)

        if not user:
            return jsonify({"error": "Invalid email or password"}), 400

        # Verify the password using bcrypt
        if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({"error": "Invalid email or password"}), 400

        # If login is successful, generate a mock token and role
        token = 'mock_token_1234567890'  # In a real application, generate a JWT token here
        role = user['role']

        # Send the success response with the token and role
        return jsonify({
            "token": token,
            "role": role
        }), 200

    except Exception as e:
        # Handle errors
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(port=5002, debug=True)
