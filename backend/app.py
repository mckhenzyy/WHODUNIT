from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from config import settings


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = settings.SECRET_KEY

    # Allow frontend to talk to backend (React dev server)
    CORS(
        app,
        origins=[settings.FRONTEND_ORIGIN],
        supports_credentials=True,
    )

    socketio = SocketIO(
        app,
        cors_allowed_origins=[settings.FRONTEND_ORIGIN],
        async_mode="eventlet",
    )

    # --- simple test route ---
    @app.route("/api/health")
    def health():
        return jsonify(
            {
                "status": "ok",
                "message": "Whodunit backend is running",
            }
        )

    # --- simple test socket event ---
    @socketio.on("ping")
    def handle_ping(data):
        print("Received ping:", data)
        # we send back a 'pong'
        socketio.emit("pong", {"message": "pong from server"})

    return app, socketio


app, socketio = create_app()

if __name__ == "__main__":
    # Run development server
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
