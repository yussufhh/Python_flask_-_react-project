import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///backend/database.db'  # Note the relative path to the database
    SQLALCHEMY_TRACK_MODIFICATIONS = False
