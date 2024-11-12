from flask import Blueprint, jsonify
from backend import db
from backend.courses.models import Course

courses_bp = Blueprint('courses', __name__)

# Route to get all courses
@courses_bp.route('/', methods=['GET'])
def get_courses():
    courses = Course.query.all()  # Query all courses from the database
    return jsonify([course.to_dict() for course in courses])  # Convert each course to a dictionary
