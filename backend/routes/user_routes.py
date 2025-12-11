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
import datetime, hashlib, uuid, time, random
# from flask_mail import Mail, Message
import requests
import os


user_routes = Blueprint("user_routes", __name__)
firebase = FirebaseService()

# mail = Mail()

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def is_valid_password(pw):
    return len(pw) >= 6 and any(c.isupper() for c in pw)


def sanitize_email(email):
    return email.replace(".", "_").replace("@", "_at_")

# ---------------------------------------------
# SIGNUP
# ---------------------------------------------
# @user_routes.route("/signup", methods=["POST"])
# def signup():
#     data = request.get_json()

#     fullname = data.get("fullname")
#     dob = data.get("dob")
#     gender = data.get("gender")
#     username = data.get("username")
#     password = data.get("password")

#     if not all([fullname, dob, gender, username, password]):
#         return jsonify({"error": "All fields are required"}), 400

#     year = int(dob.split("-")[0])
#     now = datetime.datetime.now().year

#     if (now - year) < 18:
#         return jsonify({"error": "Player must be 18+"}), 400

#     if firebase.get(f"/users/{username}") is not None:
#         return jsonify({"error": "Username already exists"}), 400

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

#     firebase.set(f"/users/{username}", user_data)

#     return jsonify({"message": "Sign up successful"}), 200


@user_routes.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    fullname = data.get("fullname")
    dob = data.get("dob")
    gender = data.get("gender")
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    
    safe_email = sanitize_email(email)
    
    if not all([fullname, dob, gender, username, password, email]):
        return jsonify({"error": "All fields are required"}), 400

    # Age check (18+)
    year = int(dob.split("-")[0])
    if (datetime.datetime.now().year - year) < 18:
        return jsonify({"error": "Player must be 18+"}), 400

    # Username exists?
    if firebase.get(f"/users/{username}") is not None:
        return jsonify({"error": "Username already taken"}), 400

    # Email exists?
    if firebase.get(f"/emails/{safe_email}"):
        return jsonify({"error": "Email already registered"}), 400

    # Password rules
    if not is_valid_password(password):
        return jsonify({"error": "Password must be at least 6 characters and have 1 uppercase letter"}), 400

    user_data = {
        "fullname": fullname,
        "dob": dob,
        "gender": gender,
        "username": username,
        "email": email,
        "password": hash_password(password),
        "total_games": 0,
        "total_wins": 0,
        "total_losses": 0,
    }

    firebase.set(f"/users/{username}", user_data)
    firebase.set(f"/emails/{safe_email}", username)

    return jsonify({"message": "Signup successful"}), 200


# ---------------------------------------------
# LOGIN
# ---------------------------------------------
# @user_routes.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()

#     username = data.get("username")
#     password = data.get("password")

#     if not username or not password:
#         return jsonify({"error": "Missing credentials"}), 400

#     user = firebase.get(f"/users/{username}")

#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     if user["password"] != hash_password(password):
#         return jsonify({"error": "Incorrect password"}), 401

#     return jsonify({"message": "Login successful", "user": user}), 200

@user_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    identifier = data.get("username")  # can be username OR email
    password = data.get("password")

    if not identifier or not password:
        return jsonify({"error": "Missing credentials"}), 400

    # Detect if input is email
    if "@" in identifier:
        # username = firebase.get(f"/emails/{identifier}")
        safe_email = sanitize_email(identifier)
        username = firebase.get(f"/emails/{safe_email}")
        if not username:
            return jsonify({"error": "Email not registered"}), 404
    else:
        username = identifier

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



# @user_routes.route("/profile/<username>", methods=["GET"])
# def profile(username):
#     user = firebase.get(f"/users/{username}")
#     history = firebase.get(f"/history/{username}") or {}

#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     total_games = user.get("total_games", 0)
#     total_wins = user.get("total_wins", 0)
#     total_losses = user.get("total_losses", 0)

#     # -------------------------------------------------
#     # 🔥 AUTO-GENERATE HISTORY ONLY IF EMPTY
#     # (For old users before history system existed)
#     # -------------------------------------------------
#     # 🔥 AUTO-FIX HISTORY IF INCOMPLETE
#     if total_games != (total_wins + total_losses) or len(history) == 0:
#         firebase.set(f"/history/{username}", {})  # reset old broken history

#         now = int(time.time())

#         for i in range(total_wins):
#             firebase.push(f"/history/{username}", {
#                 "result": "win",
#                 # Distribute wins over last 30 days
#                 "timestamp": now - (i * 86400)  # 1 game per day
#             })

#         for i in range(total_losses):
#             firebase.push(f"/history/{username}", {
#                 "result": "loss",
#                 # Losses go even older (we avoid mixing)
#                 "timestamp": now - ((total_wins + i) * 86400)
#             })

#         history = firebase.get(f"/history/{username}") or {}


#     # -------------------------------------------------
#     # 📊 Stat calculation
#     # -------------------------------------------------
#     now = int(time.time())
#     one_day = now - 86400
#     one_week = now - 604800
#     one_month = now - 2592000

#     stats = {
#     "day": {"games": 0, "wins": 0, "losses": 0},
#     "week": {"games": 0, "wins": 0, "losses": 0},
#     "month": {"games": 0, "wins": 0, "losses": 0},
#     }

#     # ---------------------------------------------
#     # 🏆 WIN STREAK
#     # ---------------------------------------------
#     win_streak = 0
#     streak_active = True

#     for key in sorted(history, reverse=True):
#         entry = history[key]
#         ts = entry["timestamp"]
#         result = entry["result"]

#         if streak_active:
#             if result == "win":
#                 win_streak += 1
#             else:
#                 streak_active = False

#         # Normalize result key
#         result_key = "wins" if result == "win" else "losses"

#         if ts >= one_day:
#             stats["day"][result_key] += 1
#             stats["day"]["games"] += 1

#         if ts >= one_week:
#             stats["week"][result_key] += 1
#             stats["week"]["games"] += 1

#         if ts >= one_month:
#             stats["month"][result_key] += 1
#             stats["month"]["games"] += 1



#     return jsonify({
#         "fullname": user["fullname"],
#         "username": user["username"],
#         "win_streak": win_streak,
#         "total_games": total_games,
#         "stats": stats
#     }), 200

@user_routes.route("/profile/<username>", methods=["GET"])
def profile(username):
    user = firebase.get(f"/users/{username}")
    history = firebase.get(f"/case_history/{username}") or {}

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Normalize timestamps (important fix)
    fixed_history = []
    for item in history.values():
        try:
            item["timestamp"] = int(item.get("timestamp", 0))
        except:
            item["timestamp"] = 0
        fixed_history.append(item)

    now = int(time.time())
    one_day = now - 86400
    one_week = now - 604800
    one_month = now - 2592000

    stats = {
        "day": {"games": 0, "wins": 0, "losses": 0},
        "week": {"games": 0, "wins": 0, "losses": 0},
        "month": {"games": 0, "wins": 0, "losses": 0},
    }

    # --- Win streak logic ---
    win_streak = 0
    streak_active = True

    # Sort correctly now that timestamps are clean
    for entry in sorted(fixed_history, key=lambda x: x["timestamp"], reverse=True):
        ts = entry["timestamp"]
        result = entry.get("result")

        if streak_active:
            if result == "win":
                win_streak += 1
            else:
                streak_active = False

        key = "wins" if result == "win" else "losses"

        if ts >= one_day:
            stats["day"][key] += 1
            stats["day"]["games"] += 1

        if ts >= one_week:
            stats["week"][key] += 1
            stats["week"]["games"] += 1

        if ts >= one_month:
            stats["month"][key] += 1
            stats["month"]["games"] += 1

    return jsonify({
        "fullname": user["fullname"],
        "username": user["username"],
        "win_streak": win_streak,
        "total_games": user.get("total_games", 0),
        "stats": stats
    }), 200

# ---------------------------------------------
# REQUEST PASSWORD RESET
# ---------------------------------------------
# @user_routes.route("/request-reset", methods=["POST"])
# def request_reset():
#     data = request.get_json()
#     email = data.get("email")

#     safe_email = sanitize_email(email)
#     username = firebase.get(f"/emails/{safe_email}")

#     if not username:
#         return jsonify({"error": "Email not found"}), 404

#     token = str(uuid.uuid4())
#     code = random.randint(100000, 999999)

#     firebase.set(f"/reset_tokens/{token}", {
#         "email": email,
#         "code": str(code),
#         "expires": int(time.time()) + 300  # 5 minutes
#     })

#     reset_url = f"http://localhost:5173/resetpassword?token={token}"

#     msg = Message(
#         subject="WHODUNIT Password Reset",
#         recipients=[email],
#         body=f"""
#             Hello Detective {username},

#             A password reset request has been made for your WHODUNIT account.

#             🔐 Verification Code: {code}

#             📎 Reset Link:
#             {reset_url}

#             This code will expire in 5 minutes — use it while it's valid.

#             If you didn't request this, ignore it. The system will prevent unauthorized access.

#             Stay vigilant, Detective.
#             - WHODUNIT Security Division
#             """
#                 )

#     mail.send(msg)

#     return jsonify({"message": "Reset email sent"}), 200



def send_reset_email(email, code, username, reset_url):
    url = "https://api.resend.com/emails"

    payload = {
        "from": "WHODUNIT <onboarding@resend.dev>",
        "to": email,
        "subject": "WHODUNIT Password Reset",
        "html": f"""
            <h2>Hello Detective {username},</h2>
            <p>A password reset request was made for your WHODUNIT account.</p>
            <p>Your verification code is: <b>{code}</b></p>
            <p>Click the link below to reset your password:</p>
            <a href="{reset_url}">{reset_url}</a>
            <p><br>This code expires in <b>5 minutes</b>.</p>
            <p>If you did not request this, you may safely ignore it.</p>
            <br>
            <p>- WHODUNIT Security Division</p>
        """
    }

    headers = {
        "Authorization": f"Bearer {os.getenv('RESEND_API_KEY')}",
        "Content-Type": "application/json"
    }

    try:
        r = requests.post(url, json=payload, headers=headers)
        print("Resend response:", r.text)
    except Exception as e:
        print("Resend error:", e)


@user_routes.route("/request-reset", methods=["POST"])
def request_reset():
    data = request.get_json()
    email = data.get("email")

    safe_email = sanitize_email(email)
    username = firebase.get(f"/emails/{safe_email}")

    if not username:
        return jsonify({"error": "Email not found"}), 404

    token = str(uuid.uuid4())
    code = random.randint(100000, 999999)

    firebase.set(f"/reset_tokens/{token}", {
        "email": email,
        "code": str(code),
        "expires": int(time.time()) + 300  # 5 minutes
    })

    # IMPORTANT: Replace localhost with your deployed frontend URL
    # reset_url = f"https://YOUR_FRONTEND_URL/resetpassword?token={token}"
    reset_url = f"https://whodunit-eight.vercel.app/resetpassword?token={token}"
    # Send email via Resend
    send_reset_email(email, code, username, reset_url)

    return jsonify({"message": "Reset email sent"}), 200



# ---------------------------------------------
# RESET PASSWORD
# ---------------------------------------------
@user_routes.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    token = data.get("token")
    code = data.get("code")
    new_password = data.get("password")

    record = firebase.get(f"/reset_tokens/{token}")
    if not record:
        return jsonify({"error": "Invalid or expired token"}), 400

    # Expired token?
    if int(time.time()) > record["expires"]:
        firebase.delete(f"/reset_tokens/{token}")
        return jsonify({"error": "Code expired"}), 400

    # Code mismatch?
    if record["code"] != code:
        return jsonify({"error": "Incorrect verification code"}), 400

    # Password strength check
    if not is_valid_password(new_password):
        return jsonify({"error": "Password must be at least 6 characters and include 1 uppercase letter"}), 400

    # 🔥 FIX: use sanitized email
    safe_email = sanitize_email(record["email"])
    username = firebase.get(f"/emails/{safe_email}")

    user = firebase.get(f"/users/{username}")
    user["password"] = hash_password(new_password)

    firebase.set(f"/users/{username}", user)
    firebase.delete(f"/reset_tokens/{token}")

    return jsonify({"message": "Password updated successfully"}), 200


def update_leaderboard(username, streak):
    path = "/leaderboard"
    
    leaderboard = firebase.get(path) or {}

    # Always overwrite existing entry
    leaderboard[username] = {
        "username": username,
        "streak": streak,
        "updated_at": int(time.time())
    }

    # Sort
    sorted_list = sorted(
        leaderboard.values(),
        key=lambda x: (-x["streak"], x["updated_at"])
    )

    # Keep only top 10
    final_list = sorted_list[:10]

    # Rebuild dictionary form
    final_dict = {entry["username"]: entry for entry in final_list}

    # Force-save
    firebase.set(path, final_dict)

    return final_dict


@user_routes.route("/leaderboard", methods=["GET"])
def get_leaderboard():
    leaderboard = firebase.get("/leaderboard") or {}

    # Sort before sending response so frontend always gets accurate order
    sorted_list = sorted(
        leaderboard.values(),
        key=lambda x: (-x["streak"], x["updated_at"])
    )

    return jsonify(sorted_list), 200