from flask import Blueprint, request, jsonify
from .models import create_connection
from .utils import hash_password, check_password
import bcrypt
from flask_jwt_extended import create_access_token

main_bp = Blueprint('main', __name__)
auth_bp = Blueprint('auth', __name__)

@main_bp.route('/create_user', methods=['POST'])
def create_user():
    connection = None
    try:
        # Get data from the request
        data = request.json
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        password = data['password']
        phone_number = data.get('phone_number', None)  # Phone number is optional

        # Hash the password
        hashed_password = hash_password(password).decode('utf-8')

        # Create a connection to the database
        connection = create_connection()
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO users (first_name, last_name, email, password, phone_number)
                VALUES (%s, %s, %s, %s, %s)
            """, (first_name, last_name, email, hashed_password, phone_number))
            connection.commit()

        return jsonify({'message': 'User created successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

    finally:
        if connection:
            connection.close()



@auth_bp.route('/login', methods=['POST'])
def login():
    connection = None
    try:
        # Get data from the request
        data = request.json
        email = data['email']
        password = data['password']

        # Create a connection to the database
        connection = create_connection()
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id, password FROM users WHERE email = %s
            """, (email,))
            user = cursor.fetchone()

            if user is None:
                return jsonify({'error': 'Invalid email or password'}), 401

            # Check the password
            user_id, stored_hashed_password = user
            if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
                access_token = create_access_token(identity=user_id)
                return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
            else:
                return jsonify({'error': 'Invalid email or password'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 400

    finally:
        if connection:
            connection.close()


@main_bp.route('/test', methods=['GET', 'POST'])
def test_route():
    return "Test route is working!", 200

