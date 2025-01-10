"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, Clients, Lawyers, Cases
from api.utils import generate_sitemap, APIException
from flask_cors import CORS



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# POST a new CLIENT
@api.route("/clients", methods=['POST'])
def add_new_client():
    data = request.get_json()
    
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    address = data.get("address")
    area_of_need = data.get("areaOfNeed")

    user_exists = Clients.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"message": "Account exists"})
    else:
        new_user = Clients(name=name, email=email, password=password, phone=phone, address=address, area_of_need=area_of_need)
        new_user.generate_password()
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User added"}), 201


@api.route("/lawyers", methods=['POST'])
def add_new_lawyer():
    data = request.get_json()
    
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    address = data.get("address")
    photo = data.get("photo")
    specialty = data.get("specialty")

    user_exists = Lawyers.query.filter_by(email=email).first()

    if user_exists:
        return jsonify({"message": "Account exists"}), 409
    else:
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
    lawyers_data = [{"id":lawyer.id, "name":lawyer.name, "photo":lawyer.photo} for lawyer in lawyers]
    return jsonify(lawyers_data)

@api.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email, password, user_type = data.get("email").lower(), data.get("password"), data.get("user_type")
  
    if user_type == "Client":
        user_exists = Clients.query.filter_by(email=email).first()
        if user_exists:
            token = create_access_token(identity=user_exists.email)
            json_data = jsonify({"token":token, "need":user_exists.area_of_need, "userType":user_type})
    else:
        user_exists = Lawyers.query.filter_by(email=email).first()
        if user_exists:
            claims = {"id":user_exists.id}
            token = create_access_token(identity=user_exists.email, additional_claims=claims)
            json_data = jsonify({"token":token, "specialty":user_exists.specialty, "photo":user_exists.photo})

    if not user_exists or not user_exists.check_password(password):
        return jsonify({"message":"login failed"}), 401
    else:
        
        return json_data, 200
    
  
@api.route("/hello", methods=["GET"])
@jwt_required()
def say_hello():
    print("hello")
    return jsonify({"test":"hello"})

@api.route("/verify", methods=["GET"])
@jwt_required()
def check():
    token = request.headers.get("Authorization").split(' ')[1]
    return jsonify(token)

@api.route('/client-cases', methods=['GET'])
@jwt_required()
def get_client_cases():
    current_user_email = get_jwt_identity()  # Get the logged-in user's email from JWT
    # Assume user identity is email; update if it's ID or another field
    user = Clients.query.filter_by(email=current_user_email).first()

    if not user:
        return jsonify({"error": "Client not found"}), 404

    # Fetch cases associated with the client
    cases = Cases.query.filter_by(client_id=user.id).all()

    # Serialize the case data
    case_list = [case.serialize() for case in cases]

    return jsonify({"logged_in_as": current_user_email, "cases": case_list}), 200
