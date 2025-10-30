from flask import Flask
from backend.config import Config
from backend.app.extensions import db, migrate
from backend.app.routes import register_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    register_routes(app)

    with app.app_context():
        from backend.app.models import user, service, master, booking

    return app
