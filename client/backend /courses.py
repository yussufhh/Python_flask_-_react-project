from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# In-memory database
courses = [
]

@app.route('/api/featured-courses', methods=['GET'])
def get_courses():
    return jsonify(courses)

@app.route('/api/featured-courses', methods=['POST'])
def add_course():
    new_course = request.json
    if not new_course.get("title") or not new_course.get("description") or not new_course.get("icon"):
        return jsonify({"error": "Invalid data"}), 400
    new_course["id"] = len(courses) + 1
    courses.append(new_course)
    return jsonify(new_course), 201

@app.route('/api/featured-courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    data = request.json
    for course in courses:
        if course['id'] == course_id:
            course.update(data)
            return jsonify(course), 200
    return jsonify({"error": "Course not found"}), 404

@app.route('/api/featured-courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    global courses
    courses = [course for course in courses if course['id'] != course_id]
    return jsonify({"message": "Course deleted"}), 200

if __name__ == '__main__':
    app.run(port =5500, debug=True)  # Run the Flask app on port 5000
