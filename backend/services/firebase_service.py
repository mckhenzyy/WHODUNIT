# import firebase_admin
# from firebase_admin import credentials, db
# import os


# class FirebaseService:
#     def __init__(self):
#         # Path to your service account key
#         base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#         key_path = os.path.join(base_dir, "config", "firebase_admin_key.json")

#         if not firebase_admin._apps:
#             cred = credentials.Certificate(key_path)

#             firebase_admin.initialize_app(
#                 cred,
#                 {
#                     "databaseURL": os.getenv("FIREBASE_DB_URL"),
#                 }
#             )

#     # Write data
#     def set(self, path, data):
#         ref = db.reference(path)
#         ref.set(data)
#         return True

#     # Read data
#     def get(self, path):
#         ref = db.reference(path)
#         return ref.get()

#     # Update data
#     def update(self, path, data):
#         ref = db.reference(path)
#         ref.update(data)
#         return True

#     # Push new entry
#     def push(self, path, data):
#         ref = db.reference(path)
#         return ref.push(data)



import firebase_admin
from firebase_admin import credentials, db
import os
import json
import base64

class FirebaseService:
    def __init__(self):
        # Load Base64 encoded Firebase key from environment
        encoded_key = os.getenv("FIREBASE_ADMIN_KEY_JSON_BASE64")

        if not encoded_key:
            raise Exception("❌ Missing FIREBASE_ADMIN_KEY_JSON_BASE64 environment variable!")

        try:
            # Decode base64 → json string → dict
            decoded_json = base64.b64decode(encoded_key).decode("utf-8")
            service_account_info = json.loads(decoded_json)
        except Exception as e:
            raise Exception(f"❌ Failed decoding Firebase key: {e}")

        if not firebase_admin._apps:
            cred = credentials.Certificate(service_account_info)

            firebase_admin.initialize_app(
                cred,
                {
                    "databaseURL": os.getenv("FIREBASE_DB_URL"),
                }
            )

        print("🔥 Firebase initialized successfully!")

    def set(self, path, data):
        db.reference(path).set(data)
        return True

    def get(self, path):
        return db.reference(path).get()

    def update(self, path, data):
        db.reference(path).update(data)
        return True

    def push(self, path, data):
        return db.reference(path).push(data)
    
    def delete(self, path):
        from firebase_admin import db
        db.reference(path).delete()
