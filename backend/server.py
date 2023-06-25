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

@app.route("/api/shops", methods=["GET", "POST"])
def shops():
    if request.method == "POST":
        return jsonify(db.add_shop(request.json)), 201
    return jsonify(db.get_shops()), 200

@app.route("/api/units", methods=["GET", "POST"])
def units():
    if request.method == "POST":
        return jsonify(db.add_unit(request.json)), 201
    return jsonify(db.get_units()), 200

@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(db.get_products()), 200

@app.route("/api/items/<item_id>", methods=["PUT", "DELETE"])
def item(item_id):
    if request.method == "DELETE":
        if db.delete_item(item_id):
            return jsonify({"msg": "Item deleted."}), 204
        return jsonify({"msg": "Unable to delete item."}), 500
    return jsonify(db.edit_item(item_id, request.json)), 200

@app.route("/api/shops/<shop_id>", methods=["PUT", "DELETE"])
def shop(shop_id):
    if request.method == "DELETE":
        if db.delete_shop(shop_id):
            return jsonify({"msg": "Shop deleted."}), 204
        return jsonify({"msg": "Unable to delete shop."}), 500
    return jsonify(db.edit_shop(shop_id, request.json)), 200

@app.route("/api/units/<unit_id>", methods=["PUT", "DELETE"])
def unit(unit_id):
    if request.method == "DELETE":
        if db.delete_unit(unit_id):
            return jsonify({"msg": "Unit deleted."}), 204
        return jsonify({"msg": "Unable to delete unit."}), 500
    return jsonify(db.edit_unit(unit_id, request.json)), 200
