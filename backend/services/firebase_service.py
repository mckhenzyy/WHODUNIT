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

class FirebaseService:
    def __init__(self):
        # 🔥 Load Firebase Admin Key from Environment Variable
        firebase_json = os.getenv("FIREBASE_ADMIN_KEY_JSON")

        if not firebase_json:
            raise Exception("❌ Missing FIREBASE_ADMIN_KEY_JSON environment variable!")

        # Convert env string → Python dict
        service_account_info = json.loads(firebase_json)

        if not firebase_admin._apps:
            cred = credentials.Certificate(service_account_info)

            firebase_admin.initialize_app(
                cred,
                {
                    "databaseURL": os.getenv("FIREBASE_DB_URL"),
                }
            )

    # 📌 Write data
    def set(self, path, data):
        db.reference(path).set(data)
        return True

    # 📌 Read data
    def get(self, path):
        return db.reference(path).get()

    # 📌 Update data
    def update(self, path, data):
        db.reference(path).update(data)
        return True

    # 📌 Push new entry
    def push(self, path, data):
        return db.reference(path).push(data)
