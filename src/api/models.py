from flask_sqlalchemy import SQLAlchemy
import bcrypt
from sqlalchemy import JSON
db = SQLAlchemy()

class User:
    def __init__(self):
        self.password = None
    
    def generate_password(self):
        password = self.password.encode('utf-8')
        hash = bcrypt.hashpw(password, bcrypt.gensalt())
        self.password = hash.decode('utf-8')
        
    def check_password(self, entered_password):
        return bcrypt.checkpw(entered_password.encode('utf-8'), self.password.encode('utf-8'))

class Clients(User, db.Model):

    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.String, unique=False, nullable=False)
    area_of_need = db.Column(db.String, unique=False, nullable=False)

    def __init__(self, name, email, password, phone, address, area_of_need):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address
        self.area_of_need = area_of_need

    def repr(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "areaOfNeed": self.area_of_need
        }
    
    
class Lawyers(User, db.Model):

    __tablename__ = 'lawyers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.String, unique=False, nullable=False)
    photo = db.Column(db.String,  unique=True, nullable=True)
    specialty = db.Column (db.String, unique=False, nullable=False)
   
    def __init__(self, name, email, password, phone, address, photo, specialty):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address
        self.photo = photo
        self.specialty = specialty

    def repr(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "photo": self.photo,
        }

    


class Cases(db.Model):
    __tablename__ = 'cases'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    lawyer_id = db.Column(db.Integer, db.ForeignKey('lawyers.id'), nullable=False)
    case_number = db.Column(db.String(30), unique=True, nullable=False)
    status = db.Column(db.String(20), nullable=False)

    # Use lazy-loaded relationships
    client = db.relationship("Clients", foreign_keys=[client_id])
    lawyer = db.relationship("Lawyers", foreign_keys=[lawyer_id])

    def serialize(self):
        return {
            "client_id": self.client_id,
            "lawyer_id": self.lawyer_id,
            "lawyer_name": self.lawyer.name if self.lawyer else None,
            "email": self.client.email,  # Dynamically retrieve the email from the related Clients table
            "lawyer_email": self.lawyer.email,
            "case_number": self.case_number,
            "status": self.status
        }