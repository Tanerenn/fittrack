FitTrack Pro – Smart Weight & Health Tracking Assistant
<img width="1916" height="899" alt="FitTrack Pro Dashboard" src="https://github.com/user-attachments/assets/e534114b-fe42-4cde-b80a-a1492e200fcd" />

FitTrack Pro is a modern web application that helps users track their weight changes, monitor daily water intake, and achieve their health goals with AI-powered insights.

🚀 Features

Advanced Dashboard
Track weight, water intake, and personal goals in a single screen.

AI Coach
Provides smart feedback based on your weight change pace and water consumption.

Water Tracking
Visual water intake tracking with wave animation and the ability to edit previous days.

Dark Mode
Modern, eye-friendly dark theme.

Interactive Charts
Detailed data visualization using Recharts.

Personal Goals
Supports weight loss, weight gain, and weight maintenance modes.

🛠 Technologies
Backend

Python & Django

Django REST Framework (API)

SQLite (Database)

Frontend

React.js (Vite)

Bootstrap 5 & Custom CSS

Recharts (Charts)

Axios (API Communication)

📦 Installation

Follow the steps below to run the project locally.

1️⃣ Backend Setup
# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Start the backend server
python manage.py runserver

2️⃣ Frontend Setup
cd frontend

# Install dependencies
npm install

# Start the frontend application
npm run dev
