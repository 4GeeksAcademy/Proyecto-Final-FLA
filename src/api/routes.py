from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import re
from sqlalchemy import or_
from .models import db, User, Product
import bcrypt
import requests

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
    
    
def fetch_dummyjson_products(query=None, category=None):
    base_url = "https://dummyjson.com/products"
    if query:
        base_url += f"/search?q={query}"
    else:
        base_url += "?limit=100"

    try:
        res = requests.get(base_url)
        data = res.json().get("products", [])
        if category:
            data = [p for p in data if p.get("category") == category]
        return data
    except Exception as e:
        print(f"Error fetching dummyjson: {e}")
        return []

def fetch_fakestore_products(query=None, category=None):
    try:
        res = requests.get("https://fakestoreapi.com/products")
        data = res.json()
        filtered = []

        for p in data:
            if query and query.lower() not in p.get("title", "").lower():
                continue
            if category and p.get("category") != category:
                continue
            filtered.append(p)
        return filtered
    except Exception as e:
        print(f"Error fetching fakestore: {e}")
        return []

def normalize_product(p, source):
    return {
        "id": f"{source}_{p.get('id')}",
        "title": p.get("title"),
        "price": float(p.get("price", 0)),
        "category": p.get("category", "unknown"),
        "image_url": p.get("thumbnail") or p.get("image"),
        "source": source
    }

@api.route('/products/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')
    category = request.args.get('category')
    try:
        min_price = float(request.args.get('min_price', 0))
        max_price = float(request.args.get('max_price', 99999))
    except ValueError:
        return jsonify({'error': 'min_price y max_price deben ser números válidos'}), 400

    # Datos desde las APIs externas
    dummy_products = fetch_dummyjson_products(query=query, category=category)
    fake_products = fetch_fakestore_products(query=query, category=category)

    # Normalizar
    all_products = [
        *[normalize_product(p, "dummyjson") for p in dummy_products],
        *[normalize_product(p, "fakestore") for p in fake_products]
    ]

    # Aplicar filtro de precio
    filtered_products = [
        p for p in all_products if min_price <= p['price'] <= max_price
    ]

    return jsonify(filtered_products), 200

@api.route('/products/compare', methods=['GET'])
def compare_products():
    title = request.args.get("title", "")
    if not title:
        return jsonify({'error': 'Se requiere un título para la comparación'}), 400

    dummy = fetch_dummyjson_products(query=title)
    fake = fetch_fakestore_products(query=title)

    all = [
        *[normalize_product(p, "dummyjson") for p in dummy],
        *[normalize_product(p, "fakestore") for p in fake]
    ]
    return jsonify(all), 200

@api.route('/products/categories', methods=['GET'])
def get_categories():
    try:
        # Obtener categorías únicas de la base de datos
        categories = db.session.query(Product.category).distinct().all()
        # Extraer los valores de las tuplas
        category_list = [cat[0] for cat in categories]
        return jsonify(category_list), 200
    except Exception as e:
        return jsonify({'error': 'Error al obtener categorías', 'details': str(e)}), 500