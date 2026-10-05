from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
import sqlite3
import hashlib

from google import genai
from dotenv import load_dotenv
import os
app = Flask(__name__)

CORS(app)

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=api_key
)

# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_database():

    connection = sqlite3.connect("menocare.db")

    connection.row_factory = sqlite3.Row

    return connection


# ==========================================
# CREATE USERS TABLE
# ==========================================

def create_database():

    connection = get_database()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            email TEXT UNIQUE NOT NULL,

            password TEXT NOT NULL

        )
    """)

    connection.commit()

    connection.close()


create_database()


# ==========================================
# HOME
# ==========================================

@app.route("/")
def home():
    return send_file("index.html")

@app.route("/<path:filename>")
def serve_frontend(filename):

    allowed_files = [
        "style.css",
        "script.js",
        "login.js",
        "index.html",
        "login.html",
        "chatbot.html",
        "symptoms.html",
        "timeline.html",
        "period.html",
        "reports.html"
    ]

    if filename in allowed_files:
        return send_from_directory(".", filename)

    return "File not found", 404


# ==========================================
# REGISTER
# ==========================================

@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")


    # Check empty fields

    if not name or not email or not password:

        return jsonify({

            "success": False,

            "message": "Please fill all the fields."

        })


    # Hash password

    hashed_password = hashlib.sha256(
        password.encode()
    ).hexdigest()


    try:

        connection = get_database()

        cursor = connection.cursor()


        cursor.execute("""
            INSERT INTO users
            (name, email, password)

            VALUES (?, ?, ?)
        """, (
            name,
            email,
            hashed_password
        ))


        connection.commit()

        connection.close()


        return jsonify({

            "success": True,

            "message": "Account created successfully!"

        })


    except sqlite3.IntegrityError:

        return jsonify({

            "success": False,

            "message": "This email is already registered."

        })
    # ==========================================
# USER LOGIN
# ==========================================

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:

        return jsonify({
            "success": False,
            "message": "Please enter email and password."
        })

    hashed_password = hashlib.sha256(
        password.encode()
    ).hexdigest()

    connection = sqlite3.connect("menocare.db")

    cursor = connection.cursor()

    cursor.execute("""
        SELECT name, email
        FROM users
        WHERE email = ? AND password = ?
    """, (email, hashed_password))

    user = cursor.fetchone()

    connection.close()

    if user:

        return jsonify({
            "success": True,
            "message": "Login successful!",
            "name": user[0],
            "email": user[1]
        })

    else:

        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        })

# ==========================================
# ASK MENO AI CHATBOT
# ==========================================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    question = data.get("question")


    if not question:

        return jsonify({

            "success": False,

            "message": "Please enter a question."

        })


    prompt = f"""
You are Ask Meno, the educational assistant
inside MenoCare.

Your purpose is to provide simple, reliable
educational information about menopause and
perimenopause.

Explain things in simple language that a
general user can understand.

You can discuss:

- Menopause
- Perimenopause
- Common symptoms
- Period changes
- Sleep
- Mood changes
- Hot flashes
- Lifestyle and wellness
- When someone should consider speaking
  with a healthcare professional

Important rules:

1. Do not diagnose a medical condition.
2. Do not prescribe medicines or give
   medication dosages.
3. Do not claim that a symptom definitely
   means menopause.
4. If symptoms could require medical attention,
   clearly recommend consulting a healthcare
   professional.
5. Be calm, supportive and non-judgmental.
6. Keep answers reasonably concise.
7. If the question is unrelated to menopause
   or women's health education, politely explain
   that you are designed mainly for MenoCare's
   menopause education purpose.

User's question:

{question}
"""


    try:

        response = client.models.generate_content(

           model="gemini-3.5-flash-lite",

            contents=prompt

        )


        return jsonify({

            "success": True,

            "answer": response.text

        })


    except Exception as error:

        print(error)

        return jsonify({

            "success": False,

            "message": "Sorry, I could not generate a response right now."

        })
# ==========================================
# RUN SERVER
# ==========================================

import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )