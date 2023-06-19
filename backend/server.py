from flask import jsonify, Flask, request
from backend.SqliteDatabase import SqliteDatabase
import os
import sys

app = Flask(__name__)
db = SqliteDatabase("database.db")
db.execute_script(os.path.dirname(os.path.realpath(__file__)) + "/create_database.sql")

@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify(db.get_items()), 200
