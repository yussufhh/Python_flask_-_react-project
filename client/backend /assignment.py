from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Importing flask_cors
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///assignments.db'  # Using SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Enabling CORS for all routes
CORS(app)

class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    due_date = db.Column(db.String(100), nullable=False)
    course = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Assignment {self.title}>'

class Submission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignment.id'), nullable=False)
    student_name = db.Column(db.String(100), nullable=False)
    submission_content = db.Column(db.Text, nullable=False)
    submission_date = db.Column(db.DateTime, default=datetime.utcnow)

    assignment = db.relationship('Assignment', backref=db.backref('submissions', lazy=True))

    def __repr__(self):
        return f'<Submission {self.student_name} for Assignment {self.assignment_id}>'

# Endpoint to add assignments
@app.route('/api/add-assignment', methods=['POST'])
def add_assignment():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    due_date = data.get('due_date')
    course = data.get('course')

    if not title or not description or not due_date or not course:
        return jsonify({"message": "All fields are required"}), 400

    new_assignment = Assignment(title=title, description=description, due_date=due_date, course=course)
    db.session.add(new_assignment)
    db.session.commit()
    return jsonify({"message": "Assignment added successfully!"}), 201

# Endpoint to get all assignments
@app.route('/api/assignments', methods=['GET'])
def get_assignments():
    assignments = Assignment.query.all()
    assignment_list = []
    for assignment in assignments:
        assignment_list.append({
            "id": assignment.id,
            "title": assignment.title,
            "description": assignment.description,
            "due_date": assignment.due_date,
            "course": assignment.course
        })
    return jsonify(assignment_list)

# Endpoint to submit assignments
@app.route('/api/submit-assignment', methods=['POST'])
def submit_assignment():
    data = request.get_json()
    assignment_id = data.get('assignment_id')
    student_name = data.get('student_name')
    submission_content = data.get('submission_content')

    if not assignment_id or not student_name or not submission_content:
        return jsonify({"message": "All fields are required"}), 400

    assignment = Assignment.query.get(assignment_id)
    if not assignment:
        return jsonify({"message": "Assignment not found"}), 404

    new_submission = Submission(
        assignment_id=assignment_id,
        student_name=student_name,
        submission_content=submission_content
    )
    db.session.add(new_submission)
    db.session.commit()
    return jsonify({"message": "Assignment submitted successfully!"}), 201

# Endpoint to get all submitted assignments
@app.route('/api/submitted-assignments', methods=['GET'])
def get_submitted_assignments():
    submissions = Submission.query.all()
    submitted_assignments = []
    
    for submission in submissions:
        submitted_assignments.append({
            "id": submission.id,
            "student_name": submission.student_name,
            "assignment_title": submission.assignment.title,  # Get the assignment title from the related Assignment
            "submission_content": submission.submission_content
        })
    
    return jsonify(submitted_assignments)

if __name__ == '__main__':
    with app.app_context():  # Create tables within application context
        db.create_all()  # Creates database tables if not already present
    app.run(debug=True, port=5001)
