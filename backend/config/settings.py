# import os
# from dotenv import load_dotenv

# HF_API_KEY = os.getenv("HF_API_KEY")
# # Load .env from project root
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# ENV_PATH = os.path.join(BASE_DIR, "..", ".env")
# load_dotenv(ENV_PATH)

# SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
# FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

# backend/config/settings.py
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "whodunit_secret")

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

# HuggingFace API
HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL = os.getenv("HF_MODEL", "gpt2")

print("Loaded HF_MODEL:", HF_MODEL)
print("Loaded HF_API_KEY:", HF_API_KEY[:10] + "********")
