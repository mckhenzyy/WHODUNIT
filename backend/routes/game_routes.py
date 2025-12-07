from flask import Blueprint, jsonify
from services.firebase_service import FirebaseService

game_routes = Blueprint("game_routes", __name__)
firebase = FirebaseService()

@game_routes.route("/test-db")
def test_db():
    firebase.set("/test", {"hello": "world"})
    data = firebase.get("/test")
    return jsonify(data)
