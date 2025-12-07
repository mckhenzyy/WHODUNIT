# import requests
# from config import settings

# API_URL = f"https://api-inference.huggingface.co/models/{settings.HF_MODEL}"
# HEADERS = {"Authorization": f"Bearer {settings.HF_API_KEY}"}

# def generate_text(prompt, max_tokens=200):
#     payload = {
#         "inputs": prompt,
#         "parameters": {
#             "max_new_tokens": max_tokens,
#             "temperature": 0.8,
#             "top_p": 0.95,
#         }
#     }

#     response = requests.post(API_URL, headers=HEADERS, json=payload)

#     if response.status_code != 200:
#         print(response.text)
#         return "AI error, please try again."

#     data = response.json()
#     return data[0]["generated_text"]

import requests
from config.settings import HF_API_KEY, HF_MODEL

print(">>> USING HF ROUTER (Chat Completions API)")

API_URL = "https://router.huggingface.co/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json",
}

def generate_text(prompt, max_tokens=350):
    """
    Unified generator for story, clues, and chat responses.
    Default max_tokens raised to 350 to avoid cut-off.
    """

    if not HF_API_KEY:
        print("HF_API_KEY is missing.")
        return "AI failed to generate text."

    payload = {
        "model": HF_MODEL,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an expert detective assistant and mystery writer. "
                    "You answer in clear, complete paragraphs and always finish your thoughts. "
                    "You guide the investigation calmly and logically. "
                    "Do NOT reveal the culprit under any circumstance. "
                    "Do NOT repeat the entire story; only reference relevant details. "
                    "Keep replies concise but meaningful (3–5 sentences). "
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "max_tokens": max_tokens,
        "temperature": 0.7,
        "top_p": 0.95
    }

    try:
        resp = requests.post(API_URL, headers=headers, json=payload, timeout=40)

        if resp.status_code != 200:
            print("HF API ERROR:", resp.status_code, resp.text)
            return "AI failed to generate text."

        data = resp.json()

        return data["choices"][0]["message"]["content"].strip()

    except Exception as e:
        print("HF API Exception:", e)
        return "AI failed to generate text."
