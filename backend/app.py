from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from config import settings


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = settings.SECRET_KEY

    # Allow frontend to talk to backend (React dev server)
    # CORS(
    #     app,
    #     origins=[settings.FRONTEND_ORIGIN],
    #     supports_credentials=True,
    # )
    CORS(app, resources={r"/*": {"origins": "*"}})


    # socketio = SocketIO(
    #     app,
    #     cors_allowed_origins=[settings.FRONTEND_ORIGIN],
    #     async_mode="eventlet",
    # )
    
    socketio = SocketIO(
        app,
        cors_allowed_origins="*",
        async_mode="eventlet",
    )


    # -----------------------------------------
    # Import routes AFTER app is created
    # -----------------------------------------
    from routes.game_routes import game_routes
    from routes.user_routes import user_routes
    from routes.solo_routes import solo_routes
    from sockets.multi_socket import register_multi_sockets
    from routes.multi_routes import multi_routes

    app.register_blueprint(game_routes, url_prefix="/api")
    app.register_blueprint(user_routes, url_prefix="/api/auth")
    app.register_blueprint(solo_routes, url_prefix="/api/solo")
    register_multi_sockets(socketio)
    app.register_blueprint(multi_routes, url_prefix="/api/multi")



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
        socketio.emit("pong", {"message": "pong from server"})

    return app, socketio


app, socketio = create_app()

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5001, debug=True)
