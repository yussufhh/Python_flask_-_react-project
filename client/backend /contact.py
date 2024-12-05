from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend communication

# In-memory database for form submissions
submissions = []

@app.route('/api/contact', methods=['GET'])
def get_submissions():
    """
    Get all form submissions.
    """
    return jsonify(submissions), 200

@app.route('/api/contact', methods=['POST'])
def add_submission():
    """
    Add a new form submission.
    """
    data = request.json

    # Validate required fields
    if not data.get("user_name") or not data.get("user_email") or not data.get("message"):
        return jsonify({"error": "Missing required fields"}), 400

    # Add the submission to the in-memory database
    submission = {
        "id": len(submissions) + 1,
        "user_name": data["user_name"],
        "user_email": data["user_email"],
        "message": data["message"]
    }
    submissions.append(submission)

    return jsonify(submission), 201

if __name__ == '__main__':
    app.run(port=5400, debug=True)
