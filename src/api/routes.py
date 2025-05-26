from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import re
from sqlalchemy import or_
from .models import db, User
import bcrypt

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    # Obtener los datos del formulario
    data = request.get_json()
    name = data.get('name')
    last_name = data.get('last_name')
    postal_code = data.get('postal_code')
    email = data.get('email')
    password = data.get('password')

    if not all([name, last_name, email, password]):
        return jsonify({'error': 'Todos los campos requeridos deben estar presentes'}), 400


    if '@' not in email or '.' not in email.split('@')[1]:
        return jsonify({'error': 'Formato de email inválido'}), 400

    # Verificar si el email ya está registrado
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'El email ya está registrado'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Crear una nueva instancia del usuario
    new_user = User(
        name=name,
        last_name=last_name,
        postal_code=postal_code,
        email=email,
        password=hashed_password.decode('utf-8'),
        is_active=True
    )

    # Guardar el usuario en la base de datos
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Usuario registrado exitosamente'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error al registrar el usuario', 'details': str(e)}), 500