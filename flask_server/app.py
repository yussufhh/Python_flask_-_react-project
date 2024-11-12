from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config  # Import Config class from config.py

# Initialize the app and database
app = Flask(__name__)
app.config.from_object(Config)  # Use the Config class to set up the configuration
db = SQLAlchemy(app)  # Set up SQLAlchemy with the app instance

# Import routes and models
from backend.courses.routes import courses_bp  # Import the courses routes Blueprint

# Register the Blueprint for courses
app.register_blueprint(courses_bp, url_prefix='/courses')

# Create tables when the app starts (if they don't exist)
@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
