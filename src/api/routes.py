"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Clients, Lawyers
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

people = [
    {'name':'Rebekah', 'id':1}, 
    {'name':'Eric', 'id':2}, 
    {'name':'Diego', 'id': 3}]

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# POST a new CLIENT
@api.route("/clients", methods=['POST'])
def add_new_client():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    address = data.get("address")

    new_user = Clients(name, email, password, phone, address)

    db.session.add(new_user)
    db.session.commit()

    client = Clients.query.filter_by(email="RBANKS@FAKEEMAIL.COM").first()
    print(client)

    return jsonify({"test": "test"})

# GET all CLIENTS
@api.route("/clients", methods=['GET'])
def get_all_clients():

    all_clients = Clients.query.all()

    if all_clients is None:
        return jsonify("No records found!"), 404
    else:
        all_clients = list(map(lambda x: x.serialize(), all_clients))
        return jsonify(all_clients), 200



# GET a specific client
@api.route("/clients/<int:id>", methods=["GET"])
def get_client(id):
    
    result = next((person for person in people if person['id'] == id), None)
    return jsonify(result)

    # client = people.query.get(id)

    # if client is None:
    #     raise APIException(f'Client ID {id} is not found!', status_code = 404)
    # client = client.serialize()
    # return jsonify(client), 200


# # POST new lawyers
# @api.route('/lawyers', methods=['POST'])
# def add_new_lawyer = ( {newLawyer} ) => {

#     newLawyer = {
#         "full_name": self.full_name,
#         "email": self.email,
#         "password": self.password
#         "phone_number": self.phone_number 
#     }

#     let options = {
#         method: 'POST',
#         body: JSON.stringify(newLawyer),
#         headers: {
#             'Content-Type': 'application/json'
#         }
#     }

#     fetch(`https:// `, options)
#     .then(response => {
#         if (!response.ok) {
#                 throw Error(response.statusText)
#             }
#         }
#         setStore([...lawyers, newLawyer]);
#         return response.json();
#     })
#     .catch(error => console.log("Error: ", error))
# }


# # GET all LAWYERS
# @api.route("/lawyers", methods=['GET'])
# def get_all_lawyers():

#     all_lawyers = Lawyers.query.all()

#     if all_lawyers is None:
#         return jsonify("No records found!"), 404
#     else:
#         all_lawyers = list(map(lambda x: x.serialize(), all_lawyers))
#         return jsonify(all_lawyers), 200

# # GET a specific lawyer
# @api.route("/lawyers/<int:id>", methods=["GET"])
# def get_lawyer(id):
    
#     lawyer = Lawyers.query.get(id)

#     if lawyer is None:
#         raise APIException(f'Lawyer ID {id} is not found!', status_code = 404)
#     lawyer = lawyer.serialize()
#     return jsonify(lawyer), 200
