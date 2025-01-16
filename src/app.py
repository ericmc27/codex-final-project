"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import smtplib
import uuid
from flask import Flask, request, jsonify, url_for, send_from_directory, render_template
from PIL import Image
from flask_cors import CORS
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, Lawyers
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, jwt_required, get_jwt
import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# from models import Person



ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)

app.config["JWT_SECRET_KEY"] = "superman"
app.config["UPLOAD_FOLDER"] = "public/"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(minutes=20)
jwt_setup = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route("/picture", methods=["POST"])
@jwt_required()
def store_picture():
    upload_folder = os.path.join(os.getcwd(), app.config['UPLOAD_FOLDER'])

    if not os.path.exists(upload_folder):
        os.mkdir(upload_folder)

    identity = get_jwt()
    user = Lawyers.query.filter_by(id=identity["id"]).first()
    file = request.files['file']
    filename = f"{os.path.splitext(file.filename)[0]}-{uuid.uuid4()}" + ".png"
    store_file = os.path.join(upload_folder, filename)
    img = Image.open(file)
    img.save(store_file, 'PNG')
    user.photo = filename
    db.session.commit()

    return jsonify({"photo": filename}), 200

@app.route("/forgot-password")
def forgot_password():
    key = os.getenv("SENDGRID_API_KEY")
    
    # message = Mail(
    # from_email='em2864@ecastillo.tech',
    # to_emails='ecastillocalderon@mercy.edu',
    # subject='Recovery password',
    # html_content='<strong>Your recovery password is: 12345</strong>')
 
    # try:
    #     sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    #     response = sg.send(message)
    #     print(response.status_code)
    # except Exception as e:
    #     print("hello")
    #     print(e)
    
    return jsonify(key)

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(app, host='0.0.0.0', port=PORT, debug=True)
