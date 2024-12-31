"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
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
    name = data.get("name").lower()
    email = data.get("email").lower()
    password = data.get("password")
    phone = data.get("phone")
    address = data.get("address").lower()

    # Create a new client instance
    new_user = Clients(name=name, email=email, password=password, phone=phone, address=address)

    # Check for duplicate email
    user_exists = Clients.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({{"error": "An account with this email already exists"}})
    else:
        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User successfully added"}), 201


@api.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email, password, user_type = data.get("email").lower(), data.get("password"), data.get("user_type")

    if user_type == "Client":
        user_exists = Clients.query.filter_by(email=email).first()
    else:
        user_exists = Lawyers.query.filter_by(email=email).first()

    if not user_exists:
        return jsonify({"message":"user does not exist"}), 409
    else:
        if password == user_exists.password:
            return jsonify({"message": "same password"})
        else:
            return jsonify({"message": "password did not match"})

  
