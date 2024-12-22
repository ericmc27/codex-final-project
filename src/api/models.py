from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            
            # do not serialize the password, its a security breach
        }
    
class Clients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(250), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    
    def __repr__(self):
        return '<Client %r>' % self.full_name

    def serialize(self):
        return {
            # do not serialize the password, its a security breach
            "full_name": self.full_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "address": self.address,
            "practice_area": self.practice_area
            
        }
    
class Lawyers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(250), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    
    def __repr__(self):
        return '<Lawyer %r>' % self.full_name

    def serialize(self):
        return {
            # do not serialize the password, its a security breach
            "full_name": self.full_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "practice_area": self.practice_area,
            "bar_number": self.bar_number,
            "law_firm": self.law_firm,
            "professional_experience": self.professional_experience            
        }