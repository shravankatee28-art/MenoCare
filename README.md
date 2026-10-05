# 🌸 MenoCare

### AI-Powered Menopause Health & Wellness Platform

MenoCare is a web-based healthcare platform designed to help women better understand and track their menopause journey.

The platform combines health tracking, personalized data management, secure user authentication, and an AI-powered chatbot called **Ask Meno** that provides educational information about menopause and related symptoms.

> **Note:** Ask Meno is an educational assistant and does not provide medical diagnoses or replace professional medical advice.

---

## 🌐 Live Demo

🚀 [MenoCare - Menopause Health Companion](https://menocare-1.onrender.com/)

## ✨ Features

### 🔐 User Authentication
- Create a personal MenoCare account
- Login using email and password
- User information stored in a local SQLite database
- Passwords are hashed before storage

### 📊 Symptom Tracker
- Record common menopause-related symptoms
- Track symptom severity
- Monitor changes over time

### 📅 Period Tracker
- Record menstrual information
- Track period history
- View recent period information

### 🕐 Health Timeline
- Maintain a timeline of health-related information
- View important changes throughout the menopause journey

### 📄 Health Reports
- Upload and manage health-related reports
- Organize important information in one place

### 🤖 Ask Meno AI Chatbot
Ask Meno is an AI-powered educational chatbot integrated into MenoCare.

Users can ask questions related to topics such as:

- Perimenopause
- Menopause symptoms
- Hot flashes
- Sleep changes
- Mood changes
- Menstrual changes
- General menopause education

The chatbot sends the user's question to the Flask backend, which communicates with the Gemini API and returns an AI-generated response.

### 🗄️ Database
MenoCare uses SQLite to store application data locally.

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### Database
- SQLite

### AI
- Google Gemini API

### Development Tools
- Visual Studio Code
- Git
- GitHub

---

## 🏗️ Project Architecture

```text
MenoCare
│
├── Frontend
│   ├── HTML
│   ├── CSS
│   └── JavaScript
│
├── Backend
│   └── Flask
│
├── Database
│   └── SQLite
│
└── AI Integration
    └── Gemini API
    
    
    User
  ↓
Chatbot Interface
  ↓
JavaScript
  ↓
Flask Backend
  ↓
Gemini API
  ↓
AI Generated Response
  ↓
Ask Meno Chatbot

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/shravankatee28-art/MenoCare.git

---

## 🔒 Security

Sensitive files are excluded from the repository using `.gitignore`.

The following files are intentionally not uploaded:

```text
.env
venv/
__pycache__/
*.pyc
menocare.db

## 🎯 Future Improvements

- Personalized user dashboards
- Persistent user-specific health records
- Conversation history for Ask Meno
- Advanced symptom analytics
- Improved report management
- Cloud database integration
- AI-powered health trend visualization
- Production deployment

## 👩‍💻 Project

**MenoCare**  
AI-powered menopause health and wellness platform.

Built as an academic software project using web development, backend programming, database management, and AI integration.
