from flask_sqlalchemy import SQLAlchemy
import bcrypt

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

    #Define the constructor to accept arguments
    def __init__(self, name, email, password, phone, address):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address


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

    # Define the constructor to accept arguments
    def __init__(self, name, email, password, phone, address, photo, specialty):
        self.name = name
        self.email = email
        self.password = password
        self.phone = phone
        self.address = address
        self.photo = photo
        self.specialty = specialty

