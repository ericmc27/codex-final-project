"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required
from api.models import db, Clients, Lawyers
from api.utils import generate_sitemap, APIException
from flask_cors import CORS



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# POST a new CLIENT
@api.route("/clients", methods=['POST'])
def add_new_client():
    data = request.get_json()
    
    # Extracting and validating fields
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    address = data.get("address")

    # Check for duplicate email
    user_exists = Clients.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"message": "Account exists"})
    else:
        # Add new client to the database
        new_user = Clients(name=name, email=email, password=password, phone=phone, address=address)
        new_user.generate_password()
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User added"}), 201


@api.route("/lawyers", methods=['POST'])
def add_new_lawyer():
    data = request.get_json()
    
    # Extracting and validating fields
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    address = data.get("address")
    photo = data.get("photo")
    specialty = data.get("specialty").title()

    # Create a new client instance

    # Check for duplicate email
    user_exists = Lawyers.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"message": "Account exists"})
    else:
        # Add the new user to the database
        new_user = Lawyers(name=name, email=email, password=password, \
                        phone=phone, address=address, photo=photo, specialty=specialty)
        new_user.generate_password()
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User added"}), 201

@api.route("/display", methods=['POST'])
def display_lawyers():
    data = request.get_json()
    lawyer_type = data.get("lawyerType")
    lawyers = Lawyers.query.filter_by(specialty=lawyer_type).filter(Lawyers.photo.isnot(None))
    # lawyers_data = [{lawyer_type:[]}]
    # lawyers_data[0][lawyer_type].extend([{"name":lawyer.name, "photo":lawyer.photo, "type":lawyer.specialty} for lawyer in lawyers])
    lawyers_data = [{"name":lawyer.name, "photo":lawyer.photo, "type":lawyer.specialty} for lawyer in lawyers]
    return jsonify(lawyers_data)

@api.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email, password, user_type = data.get("email").lower(), data.get("password"), data.get("user_type")
  

    if user_type == "Client":
        user_exists = Clients.query.filter_by(email=email).first()
    else:
        user_exists = Lawyers.query.filter_by(email=email).first()

    if not user_exists or not user_exists.check_password(password):
        return jsonify({"message":"login failed"}), 401
    else:
        claims = {"id":user_exists.id, "user_type": user_type}
        token = create_access_token(identity=user_exists.name, additional_claims=claims)
        return jsonify(token), 200
    
  
@api.route("/verify", methods=["GET"])
@jwt_required()
def check():
    token = request.headers.get("Authorization").split(' ')[1]
    return jsonify(token)


    
