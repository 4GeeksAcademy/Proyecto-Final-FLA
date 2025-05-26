"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.url_map.strict_slashes = False

backend_url = os.getenv("VITE_BACKEND_URL", "").replace('"', '').rstrip('/')

# Permitir cualquier origen
CORS(app)

# Configurar JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///auth.db" 

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Configurar admin y comandos
setup_admin(app)
setup_commands(app)

# Registrar blueprint de la API
app.register_blueprint(api, url_prefix='/api')

# Manejo de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generar sitemap
@app.route('/')
def sitemap():
    if os.environ.get("FLASK_DEBUG") == "1":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Servir archivos estáticos
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evitar caché
    return response

# Iniciar la aplicación
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT',3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)