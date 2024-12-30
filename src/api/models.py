from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON
db = SQLAlchemy()

class Clients(db.Model):

    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(40), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.String, unique=False, nullable=False)
    areaOfNeed = db.Column(db.String, unique=False, nullable=False)

    # Define the constructor to accept arguments
    def __init__(self, name, email, password, phone, address, areaOfNeed):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address
        self.areaOfNeed = areaOfNeed

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "areaOfNeed": self.areaOfNeed
        }

    


class Lawyers(db.Model):

    __tablename__ = 'lawyers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(40), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.String, unique=False, nullable=False)
    photo = db.Column(db.String,  unique=True, nullable=True)
    specialty = db.Column (JSON, unique=False, nullable=False)
    barNumber = db.Column (db.String, unique=True, nullable=False)
    lawFirm = db.Column(db.String, unique=False, nullable=True)
    professionalExperience = db.Column(db.String, unique=False, nullable=False)
    credentials = db.Column(db.String, unique=False, nullable=False)

    # Define the constructor to accept arguments
    def __init__(self, name, email, password, phone, address, photo, specialty, barNumber, lawFirm, professionalExperience, credentials):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address
        self.photo = photo
        self.specialty = specialty
        self.barNumber = barNumber
        self.lawFirm = lawFirm
        self.professionalExperience = professionalExperience
        self.credentials = credentials

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "photo": self.photo,
            "specialty": self.specialty,
            "barNumber": self.barNumber,
            "lawFirm": self.lawFirm,
            "professionalExperience": self.professionalExperience,
            "credentials": self.credentials
        }
    
