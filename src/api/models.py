from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Clients(db.Model):

    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(40), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.String, unique=False, nullable=False)

    # Define the constructor to accept arguments
    def __init__(self, name, email, password, phone, address):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address
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
    specialty = db.Column (db.String, unique=False, nullable=False)

    # Define the constructor to accept arguments
    def __init__(self, name, email, password, phone, address, photo, specialty):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address
        self.photo = photo
        self.specialty = specialty

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "photo": self.photo,
            "specialty": self.specialty
        }
    
