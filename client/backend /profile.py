from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

user_data_db = {
    "1": {
        "username": "",
        "email": "",
        "profile_pic": "https://via.placeholder.com/150"
    }
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/user/profile', methods=['GET', 'PUT'])
def user_profile():
    user_id = request.args.get('user_id') or request.json.get('user_id')
    
    if request.method == 'GET':
        user_data = user_data_db.get(user_id, {})
        return jsonify(user_data)
    
    if request.method == 'PUT':
        data = request.form.to_dict()
        username = data.get('username')
        email = data.get('email')

        profile_pic = None
        if 'profile_pic' in request.files:
            file = request.files['profile_pic']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                profile_pic = f"http://127.0.0.1:4000/uploads/{filename}"

        if user_id in user_data_db:
            user_data_db[user_id].update({
                "username": username,
                "email": email,
                "profile_pic": profile_pic or user_data_db[user_id].get("profile_pic")
            })
            return jsonify({"message": "Profile updated successfully!"}), 200
        else:
            return jsonify({"error": "User not found!"}), 404

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    app.run(debug=True, port=4000)
