from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# In-memory database for assignments and submissions
assignments = []
submissions = []

UPLOAD_FOLDER = "submissions"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/api/assignments", methods=["GET"])
def get_assignments():
    """Return all assignments."""
    return jsonify(assignments), 200

@app.route("/api/add-assignment", methods=["POST"])
def add_assignment():
    """Add a new assignment."""
    data = request.json
    title = data.get("title")
    description = data.get("description")
    due_date = data.get("due_date")
    course = data.get("course")

    if not title or not description or not due_date or not course:
        return jsonify({"message": "All fields are required."}), 400

    new_assignment = {
        "id": len(assignments) + 1,  # Automatically assign an ID
        "title": title,
        "description": description,
        "due_date": due_date,
        "course": course,
    }
    assignments.append(new_assignment)

    return jsonify({"message": "Assignment added successfully!", "assignment": new_assignment}), 201

@app.route("/api/submit-assignment", methods=["POST"])
def submit_assignment():
    """Submit an assignment with file upload."""
    if "file" not in request.files:
        return jsonify({"message": "No file uploaded."}), 400

    file = request.files["file"]
    assignment_id = request.form.get("assignment_id")
    student_name = request.form.get("student_name")

    if not assignment_id or not student_name:
        return jsonify({"message": "Assignment ID and student name are required."}), 400

    if not assignment_id.isdigit() or int(assignment_id) > len(assignments):
        return jsonify({"message": "Invalid assignment ID."}), 400

    filename = f"{student_name.replace(' ', '_')}_{file.filename}"
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    submission = {
        "id": len(submissions) + 1,
        "assignment_id": int(assignment_id),
        "student_name": student_name,
        "file_url": filepath,
        "submission_date": request.form.get("submission_date", "N/A"),  # Optional submission date
    }
    submissions.append(submission)

    return jsonify({"message": "Assignment submitted successfully!", "submission": submission}), 201

@app.route("/api/submitted-assignments", methods=["GET"])
def get_submitted_assignments():
    """Return all submitted assignments."""
    return jsonify(submissions), 200

if __name__ == "__main__":
    app.run(port=5001, debug=True)
