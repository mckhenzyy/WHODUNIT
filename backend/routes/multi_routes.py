# # backend/routes/multi_routes.py

# from flask import Blueprint, request, jsonify
# from services.firebase_service import FirebaseService
# import uuid
# import time
# import random

# from ai.generator import (
#     generate_crime_story,
#     extract_suspects,
#     pick_culprit,
#     generate_clue,
#     # you can later add multi-player specific generators here
# )

# multi_routes = Blueprint("multi_routes", __name__)
# firebase = FirebaseService()

# ROOM_TTL_SECONDS = 5 * 60          # 5 minutes to join room
# MIN_PLAYERS = 3
# MAX_PLAYERS = 5
# VOTING_UNLOCK_SECONDS = 5 * 60     # 5 minutes after start
# MAX_VOTING_ROUNDS = 2


# # --------------------------------------------
# # Helper functions
# # --------------------------------------------

# def _now() -> int:
#     return int(time.time())


# def _get_room(room_id: str):
#     return firebase.get(f"/multi_rooms/{room_id}")


# def _save_room(room_id: str, data: dict):
#     firebase.set(f"/multi_rooms/{room_id}", data)


# def _update_room(room_id: str, data: dict):
#     firebase.update(f"/multi_rooms/{room_id}", data)


# def _room_has_expired(room: dict) -> bool:
#     return _now() > room.get("expires_at", 0)


# def _active_players(room: dict):
#     """Return list of usernames who are still in the game (has_left == False)."""
#     players = room.get("players", {})
#     return [u for u, p in players.items() if not p.get("has_left", False)]


# def _update_user_stats(username: str, win: bool):
#     """Increment total_games and win/loss for a user."""
#     path = f"/users/{username}"
#     user = firebase.get(path)
#     if not user:
#         return

#     user["total_games"] = user.get("total_games", 0) + 1
#     if win:
#         user["total_wins"] = user.get("total_wins", 0) + 1
#     else:
#         user["total_losses"] = user.get("total_losses", 0) + 1

#     firebase.set(path, user)


# # --------------------------------------------
# # CREATE ROOM (host)
# # --------------------------------------------
# @multi_routes.route("/create-room", methods=["POST"])
# def create_room():
#     data = request.get_json()
#     host = data.get("username")

#     if not host:
#         return jsonify({"error": "Username is required"}), 400

#     room_id = str(uuid.uuid4())[:6].upper()   # 6-char code
#     created_at = _now()
#     expires_at = created_at + ROOM_TTL_SECONDS

#     room_data = {
#         "room_id": room_id,
#         "host": host,
#         "created_at": created_at,
#         "expires_at": expires_at,
#         "status": "waiting",
#         "players": {
#             host: {
#                 "username": host,
#                 "role": None,
#                 "side_story": None,
#                 "has_left": False,
#                 "online": False,
#             }
#         },
#         "story": None,
#         "culprit_player": None,
#         "clues": {},
#         "started_at": None,
#         "voting_round": 0,
#         "votes": {},
#         "result": None,
#     }

#     _save_room(room_id, room_data)

#     return jsonify(
#         {
#             "room_id": room_id,
#             "expires_at": expires_at,
#         }
#     ), 200


# # --------------------------------------------
# # GET ROOM INFO (for waiting room)
# # --------------------------------------------
# @multi_routes.route("/room/<room_id>", methods=["GET"])
# def get_room(room_id):
#     room = _get_room(room_id)
#     if not room:
#         return jsonify({"error": "Room not found"}), 404

#     # Optional: mark expired
#     if room["status"] == "waiting" and _room_has_expired(room):
#         room["status"] = "expired"
#         _update_room(room_id, {"status": "expired"})

#     players = list(room.get("players", {}).keys())
#     return jsonify(
#         {
#             "room_id": room["room_id"],
#             "host": room["host"],
#             "status": room["status"],
#             "players": players,
#             "created_at": room["created_at"],
#             "expires_at": room["expires_at"],
#         }
#     ), 200


# # --------------------------------------------
# # JOIN ROOM
# # --------------------------------------------
# @multi_routes.route("/join-room", methods=["POST"])
# def join_room():
#     data = request.get_json()
#     username = data.get("username")
#     room_id = data.get("room_id")

#     if not username or not room_id:
#         return jsonify({"error": "Missing username or room_id"}), 400

#     room = _get_room(room_id)
#     if not room:
#         return jsonify({"error": "Room does not exist"}), 404

#     if room["status"] != "waiting":
#         return jsonify({"error": "Game already started or room closed"}), 400

#     if _room_has_expired(room):
#         _update_room(room_id, {"status": "expired"})
#         return jsonify({"error": "Room has expired"}), 400

#     players = room.get("players", {})
#     if username in players:
#         # Already joined — ok, just return info
#         return jsonify(
#             {
#                 "message": "Rejoined room",
#                 "players": list(players.keys()),
#             }
#         ), 200

#     if len(players) >= MAX_PLAYERS:
#         return jsonify({"error": "Room full"}), 403

#     # Add player
#     firebase.set(
#         f"/multi_rooms/{room_id}/players/{username}",
#         {
#             "username": username,
#             "role": None,
#             "side_story": None,
#             "has_left": False,
#             "online": False,
#         },
#     )

#     # Refresh room to include new player
#     room = _get_room(room_id)
#     return jsonify(
#         {
#             "message": "Joined room",
#             "players": list(room["players"].keys()),
#         }
#     ), 200


# # --------------------------------------------
# # START GAME (HOST ONLY)
# # --------------------------------------------
# @multi_routes.route("/start-game", methods=["POST"])
# def start_mp_game():
#     data = request.get_json()
#     room_id = data.get("room_id")
#     username = data.get("username")  # host

#     if not room_id or not username:
#         return jsonify({"error": "Missing room_id or username"}), 400

#     room = _get_room(room_id)
#     if not room:
#         return jsonify({"error": "Room not found"}), 404

#     if room["host"] != username:
#         return jsonify({"error": "Only host can start the game"}), 403

#     if room["status"] != "waiting":
#         return jsonify({"error": "Game has already started"}), 400

#     players = list(room["players"].keys())
#     if len(players) < MIN_PLAYERS:
#         return jsonify({"error": "Minimum 3 players"}), 400

#     # --- Generate single crime story (same for all) ---
#     story = generate_crime_story()
#     suspects = extract_suspects(story)
#     culprit_name = pick_culprit(suspects)  # name inside the story

#     # Global clues for all players (you can later personalize)
#     clue1 = generate_clue(story, culprit_name, "weak")
#     clue2 = generate_clue(story, culprit_name, "strong")

#     # --- Assign roles randomly ---
#     suspect_player = random.choice(players)     # username who is the real suspect

#     for p in players:
#         role = "suspect" if p == suspect_player else "innocent"
#         side_story = f"This is {p}'s personal perspective of the story. (You can replace this with AI side stories later.)"

#         firebase.update(
#             f"/multi_rooms/{room_id}/players/{p}",
#             {
#                 "role": role,
#                 "side_story": side_story,
#             },
#         )

#     started_at = _now()

#     _update_room(
#         room_id,
#         {
#             "status": "in_game",
#             "story": story,
#             "culprit_player": suspect_player,
#             "culprit_name": culprit_name,
#             "clues": {"clue1": clue1, "clue2": clue2},
#             "started_at": started_at,
#             "voting_round": 0,
#             "votes": {},
#             "result": None,
#         },
#     )

#     return jsonify(
#         {
#             "message": "Game started",
#             "suspect_player": suspect_player,  # not shown to clients, only for debugging
#         }
#     ), 200


# # --------------------------------------------
# # GET MY ROLE + STORY (for story.jsx)
# # --------------------------------------------
# @multi_routes.route("/my-role", methods=["POST"])
# def my_role():
#     data = request.get_json()
#     room_id = data.get("room_id")
#     username = data.get("username")

#     if not room_id or not username:
#         return jsonify({"error": "Missing room_id or username"}), 400

#     room = _get_room(room_id)
#     if not room:
#         return jsonify({"error": "Room not found"}), 404

#     player = room.get("players", {}).get(username)
#     if not player:
#         return jsonify({"error": "Player not in this room"}), 404

#     return jsonify(
#         {
#             "room_id": room_id,
#             "username": username,
#             "role": player.get("role"),
#             "side_story": player.get("side_story"),
#             "story": room.get("story"),
#             "clue1": room.get("clues", {}).get("clue1"),
#             "clue2": room.get("clues", {}).get("clue2"),
#             "is_suspect": player.get("role") == "suspect",
#         }
#     ), 200


# # --------------------------------------------
# # LEAVE / FORCE EXIT
# # --------------------------------------------
# @multi_routes.route("/leave-game", methods=["POST"])
# def leave_game():
#     data = request.get_json()
#     room_id = data.get("room_id")
#     username = data.get("username")

#     if not room_id or not username:
#         return jsonify({"error": "Missing room_id or username"}), 400

#     room = _get_room(room_id)
#     if not room:
#         return jsonify({"error": "Room not found"}), 404

#     players = room.get("players", {})
#     if username not in players:
#         return jsonify({"error": "Player not in this room"}), 404

#     # Mark player as left
#     firebase.update(
#         f"/multi_rooms/{room_id}/players/{username}",
#         {"has_left": True},
#     )

#     # If game already finished, just return
#     if room.get("status") == "finished":
#         return jsonify({"message": "Left finished game"}), 200

#     # Re-fetch room to include new status
#     room = _get_room(room_id)
#     active = _active_players(room)
#     suspect_player = room.get("culprit_player")

#     # Player automatically loses when they leave (your rule)
#     _update_user_stats(username, win=False)

#     # If suspect leaves -> game ends, innocents win
#     if suspect_player == username:
#         for p in active:
#             if p != username:
#                 _update_user_stats(p, win=True)

#         _update_room(
#             room_id,
#             {
#                 "status": "finished",
#                 "result": {
#                     "winner": "innocents",
#                     "reason": "suspect_left",
#                     "suspect": username,
#                 },
#             },
#         )
#         return jsonify({"message": "Suspect left, innocents win"}), 200

#     # If leaving player is innocent:
#     # game continues as long as remaining players > 2
#     if len(active) <= 2:
#         # Not enough players to continue -> suspect wins
#         if suspect_player:
#             _update_user_stats(suspect_player, win=True)
#         for p in active:
#             if p != suspect_player:
#                 _update_user_stats(p, win=False)

#         _update_room(
#             room_id,
#             {
#                 "status": "finished",
#                 "result": {
#                     "winner": "suspect",
#                     "reason": "not_enough_players",
#                     "suspect": suspect_player,
#                 },
#             },
#         )
#         return jsonify({"message": "Not enough players, suspect wins"}, 200)

#     return jsonify({"message": "Player left, game continues"}), 200


# # --------------------------------------------
# # SUBMIT VOTE
# # (simple version: backend checks majority and win/lose)
# # --------------------------------------------
# @multi_routes.route("/vote", methods=["POST"])
# def vote():
#     data = request.get_json()
#     room_id = data.get("room_id")
#     voter = data.get("voter")
#     target = data.get("target")  # username voted as suspect

#     if not room_id or not voter or not target:
#         return jsonify({"error": "Missing room_id, voter, or target"}), 400

#     room = _get_room(room_id)
#     if not room:
#         return jsonify({"error": "Room not found"}), 404

#     if room.get("status") != "in_game":
#         return jsonify({"error": "Game is not active"}), 400

#     # Voting allowed only after 5 minutes OR if you want to auto-force at time up via frontend
#     started_at = room.get("started_at")
#     if started_at and _now() - started_at < VOTING_UNLOCK_SECONDS:
#         return jsonify({"error": "Voting not yet unlocked"}, 400)

#     players = room.get("players", {})
#     if voter not in players or target not in players:
#         return jsonify({"error": "Invalid voter or target"}), 400

#     if players[voter].get("has_left"):
#         return jsonify({"error": "Player already left game"}), 400

#     # Determine current round (1 or 2)
#     voting_round = room.get("voting_round", 0)
#     if voting_round == 0:
#         voting_round = 1
#     elif voting_round >= MAX_VOTING_ROUNDS:
#         return jsonify({"error": "No more voting rounds allowed"}, 400)

#     votes = room.get("votes", {})
#     round_key = str(voting_round)
#     round_votes = votes.get(round_key, {})

#     # Save/overwrite this voter's choice for this round
#     round_votes[voter] = target
#     votes[round_key] = round_votes

#     # Save back
#     _update_room(
#         room_id,
#         {
#             "voting_round": voting_round,
#             "votes": votes,
#         },
#     )

#     # Check if all active players have voted in this round
#     active = _active_players(room)
#     all_voted = all(p in round_votes for p in active)

#     if not all_voted:
#         return jsonify(
#             {
#                 "message": "Vote recorded, waiting for others",
#                 "round": voting_round,
#             }
#         ), 200

#     # Everyone voted -> evaluate
#     suspect_player = room.get("culprit_player")
#     # Tally
#     tally = {}
#     for v in round_votes.values():
#         tally[v] = tally.get(v, 0) + 1

#     # Determine who has majority
#     majority_target = None
#     majority_count = 0
#     for user, count in tally.items():
#         if count > majority_count:
#             majority_count = count
#             majority_target = user

#     # Need strict majority (> half of active players)
#     needed = (len(active) // 2) + 1
#     has_majority = majority_count >= needed

#     if not has_majority:
#         # No majority
#         if voting_round >= MAX_VOTING_ROUNDS:
#             # After second round with no majority -> suspect wins
#             for p in active:
#                 if p == suspect_player:
#                     _update_user_stats(p, win=True)
#                 else:
#                     _update_user_stats(p, win=False)

#             _update_room(
#                 room_id,
#                 {
#                     "status": "finished",
#                     "result": {
#                         "winner": "suspect",
#                         "reason": "no_majority",
#                         "suspect": suspect_player,
#                     },
#                 },
#             )
#             return jsonify(
#                 {
#                     "message": "No majority after final round, suspect wins",
#                     "final": True,
#                 }
#             ), 200

#         # Otherwise, allow second round
#         _update_room(room_id, {"voting_round": voting_round + 1})
#         return jsonify(
#             {
#                 "message": "No majority, another voting round allowed.",
#                 "round": voting_round,
#                 "final": False,
#             }
#         ), 200

#     # There is a majority
#     if majority_target == suspect_player:
#         # Innocents win
#         for p in active:
#             if p == suspect_player:
#                 _update_user_stats(p, win=False)
#             else:
#                 _update_user_stats(p, win=True)

#         _update_room(
#             room_id,
#             {
#                 "status": "finished",
#                 "result": {
#                     "winner": "innocents",
#                     "reason": "correct_vote",
#                     "suspect": suspect_player,
#                 },
#             },
#         )
#         return jsonify(
#             {
#                 "message": "Correct! Innocents win.",
#                 "final": True,
#                 "winner": "innocents",
#                 "suspect": suspect_player,
#             }
#         ), 200

#     # Majority voted wrong -> suspect wins
#     for p in active:
#         if p == suspect_player:
#             _update_user_stats(p, win=True)
#         else:
#             _update_user_stats(p, win=False)

#     _update_room(
#         room_id,
#         {
#             "status": "finished",
#             "result": {
#                 "winner": "suspect",
#                 "reason": "wrong_vote",
#                 "suspect": suspect_player,
#             },
#         },
#     )

#     return jsonify(
#         {
#             "message": "Wrong guess, suspect wins.",
#             "final": True,
#             "winner": "suspect",
#             "suspect": suspect_player,
#         }
#     ), 200



# backend/routes/multi_routes.py
from flask import Blueprint, request, jsonify
from services.firebase_service import FirebaseService
import uuid
import time
import random

from ai.generator import (
    generate_crime_story,
    extract_suspects,
    pick_culprit,
    generate_clue,
)

multi_routes = Blueprint("multi_routes", __name__)
firebase = FirebaseService()

ROOM_TTL_SECONDS = 5 * 60          # 5 minutes to join room
MIN_PLAYERS = 3
MAX_PLAYERS = 5
VOTING_UNLOCK_SECONDS = 5 * 60     # voting unlocked after 5 minutes
MAX_VOTING_ROUNDS = 2

MP_DURATION_SECONDS = 15 * 60      # 15 minute game duration

def _now() -> int:
    return int(time.time())

def _get_room(room_id: str):
    return firebase.get(f"/multi_rooms/{room_id}")

def _save_room(room_id: str, data: dict):
    firebase.set(f"/multi_rooms/{room_id}", data)

def _update_room(room_id: str, data: dict):
    firebase.update(f"/multi_rooms/{room_id}", data)

def _room_has_expired(room: dict) -> bool:
    return _now() > room.get("expires_at", 0)

def _active_players(room: dict):
    players = room.get("players", {})
    return [u for u, p in players.items() if not p.get("has_left", False)]

def _update_user_stats(username: str, win: bool):
    path = f"/users/{username}"
    user = firebase.get(path)
    if not user:
        return
    user["total_games"] = user.get("total_games", 0) + 1
    if win:
        user["total_wins"] = user.get("total_wins", 0) + 1
    else:
        user["total_losses"] = user.get("total_losses", 0) + 1
    firebase.set(path, user)

@multi_routes.route("/create-room", methods=["POST"])
def create_room():
    data = request.get_json()
    host = data.get("username")
    if not host:
        return jsonify({"error": "Username is required"}), 400
    room_id = str(uuid.uuid4())[:6].upper()
    created_at = _now()
    expires_at = created_at + ROOM_TTL_SECONDS

    room_data = {
        "room_id": room_id,
        "host": host,
        "created_at": created_at,
        "expires_at": expires_at,
        "status": "waiting",
        "players": {
            host: {
                "username": host,
                "role": None,
                "side_story": None,
                "has_left": False,
                "online": False,
            }
        },
        "story": None,
        "culprit_player": None,
        "culprit_name": None,
        "clues": {},
        "started_at": None,
        "duration": None,
        "voting_round": 0,
        "votes": {},
        "voting_requests": {},   # optional place for requests
        "result": None,
    }

    _save_room(room_id, room_data)

    return jsonify({"room_id": room_id, "expires_at": expires_at}), 200

@multi_routes.route("/room/<room_id>", methods=["GET"])
def get_room(room_id):
    room = _get_room(room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    if room["status"] == "waiting" and _room_has_expired(room):
        room["status"] = "expired"
        _update_room(room_id, {"status": "expired"})
    players = list(room.get("players", {}).keys())
    return jsonify({
        "room_id": room["room_id"],
        "host": room["host"],
        "status": room["status"],
        "players": players,
        "created_at": room["created_at"],
        "expires_at": room["expires_at"],
        "started_at": room.get("started_at"),
        "duration": room.get("duration"),
    }), 200

@multi_routes.route("/join-room", methods=["POST"])
def join_room():
    data = request.get_json()
    username = data.get("username")
    room_id = data.get("room_id")
    if not username or not room_id:
        return jsonify({"error": "Missing username or room_id"}), 400
    room = _get_room(room_id)
    if not room:
        return jsonify({"error": "Room does not exist"}), 404
    if room["status"] != "waiting":
        return jsonify({"error": "Game already started or room closed"}), 400
    if _room_has_expired(room):
        _update_room(room_id, {"status": "expired"})
        return jsonify({"error": "Room has expired"}), 400
    players = room.get("players", {})
    if username in players:
        return jsonify({"message": "Rejoined room", "players": list(players.keys())}), 200
    if len(players) >= MAX_PLAYERS:
        return jsonify({"error": "Room full"}), 403

    firebase.set(f"/multi_rooms/{room_id}/players/{username}", {
        "username": username,
        "role": None,
        "side_story": None,
        "has_left": False,
        "online": False,
    })

    room = _get_room(room_id)
    return jsonify({"message": "Joined room", "players": list(room["players"].keys())}), 200

@multi_routes.route("/start-game", methods=["POST"])
def start_mp_game():
    data = request.get_json()
    room_id = data.get("room_id")
    username = data.get("username")
    if not room_id or not username:
        return jsonify({"error": "Missing room_id or username"}), 400
    room = _get_room(room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    if room["host"] != username:
        return jsonify({"error": "Only host can start the game"}), 403
    if room["status"] != "waiting":
        return jsonify({"error": "Game has already started"}), 400

    players = list(room["players"].keys())
    if len(players) < MIN_PLAYERS:
        return jsonify({"error": "Minimum 3 players"}), 400

    # Generate story & clues (single copy for all players)
    story = generate_crime_story()
    suspects = extract_suspects(story)
    culprit_name = pick_culprit(suspects)
    clue1 = generate_clue(story, culprit_name, "weak")
    clue2 = generate_clue(story, culprit_name, "strong")

    suspect_player = random.choice(players)
    for p in players:
        role = "suspect" if p == suspect_player else "innocent"
        side_story = f"This is {p}'s personal perspective of the story. (AI side story placeholder.)"
        firebase.update(f"/multi_rooms/{room_id}/players/{p}", {"role": role, "side_story": side_story})

    started_at = _now()
    _update_room(room_id, {
        "status": "in_game",
        "story": story,
        "culprit_player": suspect_player,
        "culprit_name": culprit_name,
        "clues": {"clue1": clue1, "clue2": clue2},
        "started_at": started_at,
        "duration": MP_DURATION_SECONDS,
        "voting_round": 0,
        "votes": {},
        "voting_requests": {},
        "result": None,
    })

    return jsonify({"message": "Game started", "suspect_player": suspect_player}), 200

@multi_routes.route("/my-role", methods=["POST"])
def my_role():
    data = request.get_json()
    room_id = data.get("room_id")
    username = data.get("username")
    if not room_id or not username:
        return jsonify({"error": "Missing room_id or username"}), 400
    room = _get_room(room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    player = room.get("players", {}).get(username)
    if not player:
        return jsonify({"error": "Player not in this room"}), 404
    return jsonify({
        "room_id": room_id,
        "username": username,
        "role": player.get("role"),
        "side_story": player.get("side_story"),
        "story": room.get("story"),
        "clue1": room.get("clues", {}).get("clue1"),
        "clue2": room.get("clues", {}).get("clue2"),
        "is_suspect": player.get("role") == "suspect",
    }), 200

@multi_routes.route("/leave-game", methods=["POST"])
def leave_game():
    data = request.get_json()
    room_id = data.get("room_id")
    username = data.get("username")
    if not room_id or not username:
        return jsonify({"error": "Missing room_id or username"}), 400
    room = _get_room(room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    players = room.get("players", {})
    if username not in players:
        return jsonify({"error": "Player not in this room"}), 404

    firebase.update(f"/multi_rooms/{room_id}/players/{username}", {"has_left": True})
    if room.get("status") == "finished":
        return jsonify({"message": "Left finished game"}), 200

    room = _get_room(room_id)
    active = _active_players(room)
    suspect_player = room.get("culprit_player")
    _update_user_stats(username, win=False)
    if suspect_player == username:
        for p in active:
            if p != username:
                _update_user_stats(p, win=True)
        _update_room(room_id, {"status": "finished", "result": {"winner": "innocents", "reason": "suspect_left", "suspect": username}})
        return jsonify({"message": "Suspect left, innocents win"}), 200
    if len(active) <= 2:
        if suspect_player:
            _update_user_stats(suspect_player, win=True)
        for p in active:
            if p != suspect_player:
                _update_user_stats(p, win=False)
        _update_room(room_id, {"status": "finished", "result": {"winner": "suspect", "reason": "not_enough_players", "suspect": suspect_player}})
        return jsonify({"message": "Not enough players, suspect wins"}, 200)
    return jsonify({"message": "Player left, game continues"}), 200

@multi_routes.route("/vote", methods=["POST"])
def vote():
    data = request.get_json()
    room_id = data.get("room_id")
    voter = data.get("voter")
    target = data.get("target")
    if not room_id or not voter or not target:
        return jsonify({"error": "Missing room_id, voter, or target"}), 400
    room = _get_room(room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    if room.get("status") != "in_game":
        return jsonify({"error": "Game is not active"}), 400
    started_at = room.get("started_at")
    if started_at and _now() - started_at < VOTING_UNLOCK_SECONDS:
        return jsonify({"error": "Voting not yet unlocked"}, 400)
    players = room.get("players", {})
    if voter not in players or target not in players:
        return jsonify({"error": "Invalid voter or target"}), 400
    if players[voter].get("has_left"):
        return jsonify({"error": "Player already left game"}), 400

    voting_round = room.get("voting_round", 0)
    if voting_round == 0:
        voting_round = 1
    elif voting_round >= MAX_VOTING_ROUNDS:
        return jsonify({"error": "No more voting rounds allowed"}, 400)

    votes = room.get("votes", {})
    round_key = str(voting_round)
    round_votes = votes.get(round_key, {})
    round_votes[voter] = target
    votes[round_key] = round_votes

    _update_room(room_id, {"voting_round": voting_round, "votes": votes})

    active = _active_players(room)
    all_voted = all(p in round_votes for p in active)
    if not all_voted:
        return jsonify({"message": "Vote recorded, waiting for others", "round": voting_round}), 200

    suspect_player = room.get("culprit_player")
    tally = {}
    for v in round_votes.values():
        tally[v] = tally.get(v, 0) + 1

    majority_target = None
    majority_count = 0
    for user, count in tally.items():
        if count > majority_count:
            majority_count = count
            majority_target = user

    needed = (len(active) // 2) + 1
    has_majority = majority_count >= needed

    if not has_majority:
        if voting_round >= MAX_VOTING_ROUNDS:
            for p in active:
                if p == suspect_player:
                    _update_user_stats(p, win=True)
                else:
                    _update_user_stats(p, win=False)
            _update_room(room_id, {"status": "finished", "result": {"winner": "suspect", "reason": "no_majority", "suspect": suspect_player}})
            return jsonify({"message": "No majority after final round, suspect wins", "final": True}), 200
        _update_room(room_id, {"voting_round": voting_round + 1})
        return jsonify({"message": "No majority, another voting round allowed.", "round": voting_round, "final": False}), 200

    if majority_target == suspect_player:
        for p in active:
            if p == suspect_player:
                _update_user_stats(p, win=False)
            else:
                _update_user_stats(p, win=True)
        _update_room(room_id, {"status": "finished", "result": {"winner": "innocents", "reason": "correct_vote", "suspect": suspect_player}})
        return jsonify({"message": "Correct! Innocents win.", "final": True, "winner": "innocents", "suspect": suspect_player}), 200

    for p in active:
        if p == suspect_player:
            _update_user_stats(p, win=True)
        else:
            _update_user_stats(p, win=False)
    _update_room(room_id, {"status": "finished", "result": {"winner": "suspect", "reason": "wrong_vote", "suspect": suspect_player}})
    return jsonify({"message": "Wrong guess, suspect wins.", "final": True, "winner": "suspect", "suspect": suspect_player}), 200


# --------------------------------------------------
# MATCH INFO (used by chatbox to sync timer globally)
# --------------------------------------------------
@multi_routes.route("/match-info", methods=["POST"])
def match_info():
    data = request.get_json()
    room_id = data.get("room_id")
    username = data.get("username")

    if not room_id or not username:
        return jsonify({"error": "Missing params"}), 400

    room = _get_room(room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404

    return jsonify({
        "room_id": room_id,
        "status": room.get("status"),
        "started_at": room.get("started_at"),      # UNIX timestamp
        "total_duration": 15 * 60 if not room.get("extension_used") else 5 * 60,
        "clues": room.get("clues"),
        "story": room.get("story"),
        "players": list(room.get("players", {}).keys())
    }), 200