from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory user data to simulate a database
user_data_db = {
    "1": {
        "username": "moonlover",
        "email": "moonlover@example.com",
        "profile_pic": "https://via.placeholder.com/150"
    }
}

@app.route('/api/user/profile', methods=['GET', 'PUT'])
def user_profile():
    user_id = request.args.get('user_id') or request.json.get('user_id')
    
    if request.method == 'GET':
        # Fetch user data from the in-memory "database"
        user_data = user_data_db.get(user_id, {})
        return jsonify(user_data)
    
    if request.method == 'PUT':
        # Simulate profile update
        data = request.get_json()  # Get JSON data from the PUT request
        if user_id in user_data_db:
            user_data_db[user_id].update(data)  # Update the existing data
            return jsonify({"message": "Profile updated successfully!"}), 200
        else:
            return jsonify({"error": "User not found!"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=4000)
