from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    postal_code = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)


    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'last_name': self.last_name,
            'postal_code': self.postal_code,
            'email': self.email,
            'is_active': self.is_active
        }