# from flask import Blueprint, request, jsonify
# from services.firebase_service import FirebaseService
# import datetime
# import hashlib

# user_routes = Blueprint("user_routes", __name__)
# firebase = FirebaseService()


# def hash_password(password):
#     return hashlib.sha256(password.encode()).hexdigest()


# # ---------------------------------------------
# # SIGNUP
# # ---------------------------------------------
# @user_routes.route("/signup", methods=["POST"])
# def signup():
#     data = request.get_json()

#     fullname = data.get("fullname")
#     dob = data.get("dob")
#     gender = data.get("gender")
#     username = data.get("username")
#     password = data.get("password")

#     # Validate
#     if not all([fullname, dob, gender, username, password]):
#         return jsonify({"error": "All fields are required"}), 400

#     # Age validation (must be 18+)
#     year = int(dob.split("-")[0])
#     now = datetime.datetime.now().year

#     if (now - year) < 18:
#         return jsonify({"error": "Player must be 18+"}), 400

#     # Check if username exists
#     if firebase.get(f"/users/{username}") is not None:
#         return jsonify({"error": "Username already exists"}), 400

#     # Build user record
#     user_data = {
#         "fullname": fullname,
#         "dob": dob,
#         "gender": gender,
#         "username": username,
#         "password": hash_password(password),
#         "total_games": 0,
#         "total_wins": 0,
#         "total_losses": 0,
#     }

#     # Save into Firebase
#     firebase.set(f"/users/{username}", user_data)

#     return jsonify({"message": "Sign up successful"}), 200


# # ---------------------------------------------
# # LOGIN
# # ---------------------------------------------
# @user_routes.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()

#     username = data.get("username")
#     password = data.get("password")

#     if not username or not password:
#         return jsonify({"error": "Missing username or password"}), 400

#     # Fetch from DB
#     user = firebase.get(f"/users/{username}")

#     if user is None:
#         return jsonify({"error": "User not found"}), 404

#     # Check password
#     if user["password"] != hash_password(password):
#         return jsonify({"error": "Incorrect password"}), 401

#     return jsonify({"message": "Login successful", "user": user}), 200




from flask import Blueprint, request, jsonify
from services.firebase_service import FirebaseService
import datetime, hashlib, time

user_routes = Blueprint("user_routes", __name__)
firebase = FirebaseService()


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


# ---------------------------------------------
# SIGNUP
# ---------------------------------------------
@user_routes.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    fullname = data.get("fullname")
    dob = data.get("dob")
    gender = data.get("gender")
    username = data.get("username")
    password = data.get("password")

    if not all([fullname, dob, gender, username, password]):
        return jsonify({"error": "All fields are required"}), 400

    year = int(dob.split("-")[0])
    now = datetime.datetime.now().year

    if (now - year) < 18:
        return jsonify({"error": "Player must be 18+"}), 400

    if firebase.get(f"/users/{username}") is not None:
        return jsonify({"error": "Username already exists"}), 400

    user_data = {
        "fullname": fullname,
        "dob": dob,
        "gender": gender,
        "username": username,
        "password": hash_password(password),
        "total_games": 0,
        "total_wins": 0,
        "total_losses": 0,
    }

    firebase.set(f"/users/{username}", user_data)

    return jsonify({"message": "Sign up successful"}), 200


# ---------------------------------------------
# LOGIN
# ---------------------------------------------
@user_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing credentials"}), 400

    user = firebase.get(f"/users/{username}")

    if not user:
        return jsonify({"error": "User not found"}), 404

    if user["password"] != hash_password(password):
        return jsonify({"error": "Incorrect password"}), 401

    return jsonify({"message": "Login successful", "user": user}), 200



# ---------------------------------------------
# PROFILE - Stats / Win streak / History
# ---------------------------------------------
# @user_routes.route("/profile/<username>", methods=["GET"])
# def profile(username):
#     user = firebase.get(f"/users/{username}")
#     history = firebase.get(f"/history/{username}") or {}

#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     now = int(time.time())
#     one_day = now - 86400
#     one_week = now - 604800
#     one_month = now - 2592000

#     stats = {
#         "day": {"wins": 0, "losses": 0},
#         "week": {"wins": 0, "losses": 0},
#         "month": {"wins": 0, "losses": 0},
#     }

#     win_streak = 0
#     streak_active = True

#     for key in sorted(history, reverse=True):
#         entry = history[key]
#         ts = entry["timestamp"]
#         result = entry["result"]

#         # Streak logic
#         if streak_active:
#             if result == "win":
#                 win_streak += 1
#             else:
#                 streak_active = False

#         # Time filters
#         if ts >= one_day:
#             stats["day"][result + "s"] += 1
#         if ts >= one_week:
#             stats["week"][result + "s"] += 1
#         if ts >= one_month:
#             stats["month"][result + "s"] += 1

#     return jsonify({
#         "fullname": user["fullname"],
#         "username": user["username"],
#         "win_streak": win_streak,
#         "total_games": user["total_games"],
#         "stats": stats
#     }), 200



@user_routes.route("/profile/<username>", methods=["GET"])
def profile(username):
    user = firebase.get(f"/users/{username}")
    history = firebase.get(f"/history/{username}") or {}

    if not user:
        return jsonify({"error": "User not found"}), 404

    total_games = user.get("total_games", 0)
    total_wins = user.get("total_wins", 0)
    total_losses = user.get("total_losses", 0)

    # -------------------------------------------------
    # 🔥 AUTO-GENERATE HISTORY ONLY IF EMPTY
    # (For old users before history system existed)
    # -------------------------------------------------
    # 🔥 AUTO-FIX HISTORY IF INCOMPLETE
    if total_games != (total_wins + total_losses) or len(history) == 0:
        firebase.set(f"/history/{username}", {})  # reset old broken history

        now = int(time.time())

        # Rebuild wins
        for i in range(total_wins):
            firebase.push(f"/history/{username}", {
                "result": "win",
                "timestamp": now - (i * 200)
            })

        # Rebuild losses
        for i in range(total_losses):
            firebase.push(f"/history/{username}", {
                "result": "loss",
                "timestamp": now - ((total_wins * 200) + i * 200)
            })

        history = firebase.get(f"/history/{username}") or {}


    # -------------------------------------------------
    # 📊 Stat calculation
    # -------------------------------------------------
    now = int(time.time())
    one_day = now - 86400
    one_week = now - 604800
    one_month = now - 2592000

    stats = {
    "day": {"games": 0, "wins": 0, "losses": 0},
    "week": {"games": 0, "wins": 0, "losses": 0},
    "month": {"games": 0, "wins": 0, "losses": 0},
    }

    # ---------------------------------------------
    # 🏆 WIN STREAK
    # ---------------------------------------------
    win_streak = 0
    streak_active = True

    for key in sorted(history, reverse=True):
        entry = history[key]
        ts = entry["timestamp"]
        result = entry["result"]

        if streak_active:
            if result == "win":
                win_streak += 1
            else:
                streak_active = False

        # Normalize result key
        result_key = "wins" if result == "win" else "losses"

        if ts >= one_day:
            stats["day"][result_key] += 1
            stats["day"]["games"] += 1

        if ts >= one_week:
            stats["week"][result_key] += 1
            stats["week"]["games"] += 1

        if ts >= one_month:
            stats["month"][result_key] += 1
            stats["month"]["games"] += 1



    return jsonify({
        "fullname": user["fullname"],
        "username": user["username"],
        "win_streak": win_streak,
        "total_games": total_games,
        "stats": stats
    }), 200

