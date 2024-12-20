"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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
    
    client = Clients.query.get(id)

    if client is None:
        raise APIException(f'Client ID {id} is not found!', status_code = 404)
    client = client.serialize()
    return jsonify(client), 200

# GET all LAWYERS
@api.route("/lawyers", methods=['GET'])
def get_all_lawyers():

    all_lawyers = Lawyers.query.all()

    if all_lawyers is None:
        return jsonify("No records found!"), 404
    else:
        all_lawyers = list(map(lambda x: x.serialize(), all_lawyers))
        return jsonify(all_lawyers), 200

# GET a specific lawyer
@api.route("/lawyers/<int:id>", methods=["GET"])
def get_lawyer(id):
    
    lawyer = Lawyers.query.get(id)

    if lawyer is None:
        raise APIException(f'Lawyer ID {id} is not found!', status_code = 404)
    lawyer = lawyer.serialize()
    return jsonify(lawyer), 200
