

# EduMaster - Learning Management System

EduMaster is a comprehensive Learning Management System designed to provide a wide range of educational courses for users looking to expand their knowledge and develop skills in various subjects. Built with a React and Tailwind CSS front-end, Python Flask back-end, and SQLite3 database, EduMaster offers an easy-to-use interface with robust backend functionality.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **Browse Courses**: Users can view a list of available courses, each with a description and category.
- **Course Details**: Detailed view of individual courses, including an introduction and syllabus.
- **Progress Tracking**: Tracks user progress and completion status.
- **User Accounts**: Simple authentication system for users to register, log in, and manage their courses.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Python (Flask)
- **Database**: SQLite3

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (for frontend)
- [Python 3.x](https://www.python.org/) (for backend)
- [SQLite3](https://www.sqlite.org/)

### Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/edumaster.git
   cd edumaster
   ```

2. **Backend Setup (Flask + SQLite):**
   - Navigate to the `backend` folder.
     ```bash
     cd backend
     ```
   - Create a virtual environment and activate it:
     ```bash
     python3 -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Initialize the database:
     ```bash
     flask db init
     flask db migrate
     flask db upgrade
     ```

3. **Frontend Setup (React + Tailwind CSS):**
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install Node dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

## Usage

1. **Running the Backend Server**  
   Start the Flask server from the `backend` folder:
   ```bash
   flask run
   ```
   By default, this will start the server at `http://127.0.0.1:5000`.

2. **Running the Frontend Server**  
   Start the React development server from the `frontend` folder:
   ```bash
   npm start
   ```
   This will start the front-end server at `http://localhost:3000`.

3. **Accessing the Application**  
   Visit `http://localhost:3000` to interact with the LMS application. The frontend will communicate with the Flask backend to load and manage course data.

## Project Structure

```plaintext
your_project/
├── backend/
│   ├── app.py                # Main Flask application entry point
│   ├── config.py             # Configuration file
│   ├── models.py             # Database models
│   ├── database.db           # SQLite database
│   ├── __init__.py           # Flask app setup and initialization
│   └── courses/
│       ├── routes.py         # API routes for courses
│       ├── models.py         # Course model for database
└── frontend/
    └── src/
        └── components/
            └── pages/
                └── Courses.jsx # Course display component in React
```

## API Endpoints

### Courses

- **GET /api/courses** - Retrieve all available courses.
- **GET /api/courses/<id>** - Retrieve details of a specific course.
- **POST /api/courses** - Add a new course (Admin only).
- **PUT /api/courses/<id>** - Update course information (Admin only).
- **DELETE /api/courses/<id>** - Delete a course (Admin only).

### Users

- **POST /api/register** - Register a new user.
- **POST /api/login** - Log in a user.
- **GET /api/user/<id>** - Retrieve user details.

For more details on each endpoint, check the API documentation (available at `/api/docs`).

## Contributing

We welcome contributions to EduMaster! If you'd like to help, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes.
4. Commit and push your branch:
   ```bash
   git commit -m "Add feature-name"
   git push origin feature-name
   ```
5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

