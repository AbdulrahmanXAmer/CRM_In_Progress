from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config

def create_app():
    app = Flask(__name__)
    
    # Load configuration from config.py
    app.config.from_object(Config)
    
    # Initialize CORS
    CORS(app)
    
    # Initialize JWT
    jwt = JWTManager(app)
    
    # Register the auth blueprint
    from .routes import auth_bp, main_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(main_bp)
    
    print(app.url_map)  # Print the registered routes for debugging
    
    return app
