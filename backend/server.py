from flask import jsonify, Flask, request
from backend.SqliteDatabase import SqliteDatabase
import os

app = Flask(__name__)
db = SqliteDatabase("database.db")
db.execute_script(os.path.dirname(os.path.realpath(__file__)) + "/create_database.sql")

@app.route("/api/items", methods=["GET", "POST"])
def items():
    if request.method == "POST":
        return jsonify(db.add_item(request.json)), 201
    return jsonify(db.get_items()), 200

@app.route("/api/shops", methods=["GET"])
def get_shops():
    return jsonify(db.get_shops()), 200

@app.route("/api/units", methods=["GET"])
def get_units():
    return jsonify(db.get_units()), 200

@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(db.get_products()), 200

@app.route("/api/items/<item_id>", methods=["PUT"])
def item(item_id):
    return jsonify(db.edit_item(item_id, request.json)), 200
