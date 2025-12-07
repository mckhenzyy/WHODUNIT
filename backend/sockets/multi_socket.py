# # backend/sockets/multi_socket.py

# from flask_socketio import join_room, leave_room, emit
# from services.firebase_service import FirebaseService

# firebase = FirebaseService()

# def _get_player_list(room_id: str):
#     """Helper: return list of usernames in this room."""
#     room = firebase.get(f"/multi_rooms/{room_id}")
#     if not room or "players" not in room:
#         return []
#     return list(room["players"].keys())

# def register_multi_sockets(socketio):

#     @socketio.on("join_room")
#     def handle_join(data):
#         room_id = data.get("room_id")
#         username = data.get("username") or data.get("user")

#         if not room_id or not username:
#             return

#         # Join the Socket.IO room
#         join_room(room_id)

#         # Mark as online in Firebase (if room exists)
#         room = firebase.get(f"/multi_rooms/{room_id}")
#         if room and "players" in room and username in room["players"]:
#             firebase.update(
#                 f"/multi_rooms/{room_id}/players/{username}",
#                 {"online": True}
#             )

#         # Broadcast system message
#         emit(
#             "system_message",
#             {
#                 "type": "join",
#                 "user": username,
#                 "text": f"{username} joined the room.",
#             },
#             room=room_id,
#         )

#         # Send updated player list
#         players = _get_player_list(room_id)
#         emit("players_update", players, room=room_id)

#     @socketio.on("leave_room")
#     def handle_leave(data):
#         room_id = data.get("room_id")
#         username = data.get("username") or data.get("user")

#         if not room_id or not username:
#             return

#         leave_room(room_id)

#         # Mark as offline in Firebase
#         room = firebase.get(f"/multi_rooms/{room_id}")
#         if room and "players" in room and username in room["players"]:
#             firebase.update(
#                 f"/multi_rooms/{room_id}/players/{username}",
#                 {"online": False}
#             )

#         emit(
#             "system_message",
#             {
#                 "type": "leave",
#                 "user": username,
#                 "text": f"{username} left the room.",
#             },
#             room=room_id,
#         )

#         players = _get_player_list(room_id)
#         emit("players_update", players, room=room_id)

#     @socketio.on("send_message")
#     def chat_message(data):
#         room_id = data.get("room_id")
#         username = data.get("username") or data.get("user")
#         text = data.get("text")

#         if not room_id or not username or not text:
#             return

#         emit(
#             "receive_message",
#             {
#                 "user": username,
#                 "text": text,
#             },
#             room=room_id,
#         )

#     @socketio.on("start_voting")
#     def start_vote(data):
#         room_id = data.get("room_id")
#         username = data.get("username") or data.get("user")

#         if not room_id or not username:
#             return

#         # Just broadcast that someone wants to start voting.
#         # The HTTP API will handle the actual vote logic.
#         emit(
#             "voting_started",
#             {
#                 "initiator": username,
#             },
#             room=room_id,
#         )




# backend/sockets/multi_socket.py
from flask_socketio import join_room, leave_room, emit
from services.firebase_service import FirebaseService

firebase = FirebaseService()

def _get_player_list(room_id: str):
    room = firebase.get(f"/multi_rooms/{room_id}")
    if not room or "players" not in room:
        return []
    return list(room["players"].keys())

def register_multi_sockets(socketio):

    @socketio.on("join_room")
    def handle_join(data):
        room_id = data.get("room_id")
        username = data.get("username") or data.get("user")
        if not room_id or not username:
            return
        join_room(room_id)

        room = firebase.get(f"/multi_rooms/{room_id}")
        if room and "players" in room and username in room["players"]:
            firebase.update(f"/multi_rooms/{room_id}/players/{username}", {"online": True})

        emit("system_message", {"type": "join", "user": username, "text": f"{username} joined the room."}, room=room_id)
        players = _get_player_list(room_id)
        emit("players_update", players, room=room_id)

    @socketio.on("leave_room")
    def handle_leave(data):
        room_id = data.get("room_id")
        username = data.get("username") or data.get("user")
        if not room_id or not username:
            return
        leave_room(room_id)

        room = firebase.get(f"/multi_rooms/{room_id}")
        if room and "players" in room and username in room["players"]:
            firebase.update(f"/multi_rooms/{room_id}/players/{username}", {"online": False})

        emit("system_message", {"type": "leave", "user": username, "text": f"{username} left the room."}, room=room_id)
        players = _get_player_list(room_id)
        emit("players_update", players, room=room_id)

    @socketio.on("send_message")
    def chat_message(data):
        room_id = data.get("room_id")
        username = data.get("username") or data.get("user")
        text = data.get("text")
        if not room_id or not username or not text:
            return
        emit("receive_message", {"user": username, "text": text}, room=room_id)

    # -------------------------
    # Voting request flow (Majority-based)
    # -------------------------
    @socketio.on("request_voting")
    def handle_request_voting(data):
        room_id = data.get("room_id")
        initiator = data.get("username") or data.get("user")
        if not room_id or not initiator:
            return

        # mark initiator as "accepted" in voting_requests (initiator auto-accepted)
        firebase.set(f"/multi_rooms/{room_id}/voting_requests/{initiator}", {"accepted": True, "initiator": True})

        # fetch players and current requests
        room = firebase.get(f"/multi_rooms/{room_id}") or {}
        players = list(room.get("players", {}).keys())
        requests = firebase.get(f"/multi_rooms/{room_id}/voting_requests") or {}

        # broadcast current voting request state
        emit("voting_requested", {"initiator": initiator, "requests": requests, "players": players}, room=room_id)

        # check majority
        accepted_count = sum(1 for v in (requests.values() if isinstance(requests, dict) else []) if v.get("accepted"))
        # ensure we recount initiator (firebase.set was already called, but re-read)
        requests = firebase.get(f"/multi_rooms/{room_id}/voting_requests") or {}
        accepted_count = sum(1 for v in requests.values() if v.get("accepted"))
        needed = (len(players) // 2) + 1
        if accepted_count >= needed:
            # clear voting_requests and notify voting_unlocked
            firebase.set(f"/multi_rooms/{room_id}/voting_requests", None)
            emit("voting_unlocked", {"by": initiator}, room=room_id)

    @socketio.on("respond_voting")
    def handle_respond_voting(data):
        room_id = data.get("room_id")
        username = data.get("username") or data.get("user")
        accept = data.get("accept", False)
        if not room_id or not username:
            return

        # Save the response (accepted True/False)
        firebase.set(f"/multi_rooms/{room_id}/voting_requests/{username}", {"accepted": bool(accept)})

        # Broadcast updated request states
        room = firebase.get(f"/multi_rooms/{room_id}") or {}
        players = list(room.get("players", {}).keys())
        requests = firebase.get(f"/multi_rooms/{room_id}/voting_requests") or {}
        emit("voting_requested", {"initiator": None, "requests": requests, "players": players}, room=room_id)

        # Check majority
        accepted_count = sum(1 for v in requests.values() if v.get("accepted"))
        needed = (len(players) // 2) + 1
        if accepted_count >= needed:
            firebase.set(f"/multi_rooms/{room_id}/voting_requests", None)
            emit("voting_unlocked", {"by": username}, room=room_id)

    @socketio.on("start_voting")
    def start_vote(data):
        room_id = data.get("room_id")
        username = data.get("username") or data.get("user")
        if not room_id or not username:
            return
        emit("voting_started", {"initiator": username}, room=room_id)
