"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, Clients, Lawyers, Cases
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant
import os
import uuid

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
            claims = {"id":user_exists.id, "role":user_type}
            token = create_access_token(identity=user_exists.email, additional_claims=claims)
            json_data = jsonify({"token":token, "need":user_exists.area_of_need, "userType":user_type})
    else:
        user_exists = Lawyers.query.filter_by(email=email).first()
        print(user_exists.cases)
        if user_exists:
            claims = {"id":user_exists.id, "role":user_type}
            token = create_access_token(identity=user_exists.email, additional_claims=claims)
            json_data = jsonify({"token":token, "name":user_exists.name, "specialty":user_exists.specialty, "photo":user_exists.photo})

    if not user_exists or not user_exists.check_password(password):
        return jsonify({"message":"login failed"}), 401
    else:
        
        return json_data, 200
    
  
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



# def generate_token_chat(email):
#     account_sid = os.environ['TWILIO_ACCOUNT_SID']
#     api_key = os.environ['TWILIO_API_KEY']
#     api_secret = os.environ['TWILIO_API_KEY_SECRET']

#     token_chat = AccessToken(account_sid, api_key, api_secret, identity=email)
#     chat_grant = ChatGrant(service_sid="IS94e202b0d876453699a53eab5be3ccdf")
#     token_chat.add_grant(chat_grant)

#     return token_chat

@api.route("/submit-case", methods=["POST"])
@jwt_required()
def submit_Case():
    title, body = request.json['title'], request.json['body']
    client_email = get_jwt_identity()
    lawyer_id = request.json['lawyerId']
    lawyer = Lawyers.query.filter_by(id=lawyer_id).first()
    client = Clients.query.filter_by(email=client_email).first()
    new_case = Cases(client_id=client.id, lawyer_id=lawyer.id, title=title, body=body, case_number=str(uuid.uuid4()), status="INCOMING")
    db.session.add(new_case)
    db.session.commit()
    return jsonify({"test":"message received"})

@api.route('/incoming-cases', methods=['GET'])
@jwt_required()
def get_incoming_cases():
    identity = get_jwt_identity()
    lawyer = Lawyers.query.filter_by(email=identity).first()
    incoming_cases = [case.serialize() for case in lawyer.cases if case.status == "INCOMING"]
    incoming_cases.reverse()
    return incoming_cases


@api.route("/closed-cases", methods=['POST'])
@jwt_required()
def get_closed_cases():
    body = request.get_json()
    lawyer = Lawyers.query.filter_by(photo=body['photo']).first()
    closed_cases = [case.serialize() for case in lawyer.cases if case.status == "CLOSED"]
    # cases = [{'title':case.title, 'body':case.body} for case in closed_cases]
    # print(cases)
    return jsonify(closed_cases)

@api.route("/verify", methods=["GET"])
@jwt_required()
def check():
    token = request.headers.get("Authorization").split(' ')[1]
    return jsonify(token)