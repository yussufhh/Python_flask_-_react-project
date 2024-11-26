from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

# Example SQLite database connection (adjust to your actual database)
def connect_db():
    conn = sqlite3.connect('courses.db')
    conn.row_factory = sqlite3.Row  # This allows column names to be used as keys in the result
    return conn

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course_content(course_id):
    # Connect to the database
    conn = connect_db()
    cursor = conn.cursor()

    # Query the database to get the course data by ID
    cursor.execute("SELECT * FROM courses WHERE id = ?", (course_id,))
    course = cursor.fetchone()
    conn.close()

    if course:
        # Return the course data as a JSON response
        return jsonify({
            'id': course['id'],
            'title': course['title'],
            'description': course['description'],
            'instructor': course['instructor'],
            'content': course['content'],  # Detailed course introduction
            'syllabus': course['syllabus']  # Full syllabus
        })
    else:
        # Return an error message if the course is not found
        return jsonify({'error': 'Course not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8000)  # Ensure the port is 8000
