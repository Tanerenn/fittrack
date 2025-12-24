FitTrack Pro – Smart Weight & Health Tracking Assistant
<img width="1916" height="899" alt="image" src="https://github.com/user-attachments/assets/e534114b-fe42-4cde-b80a-a1492e200fcd" />

FitTrack Pro is a modern web application that helps users track their weight changes, monitor daily water intake, and reach their goals with AI-powered insights.

🚀 Features

Advanced Dashboard: Track weight, water intake, and goals all in one screen.

AI Coach: Provides smart feedback based on your weight loss pace and water consumption.

Water Tracking: Visual water tracking with wave animation and the ability to edit past days.

Dark Mode: A modern, eye-friendly dark theme.

Interactive Charts: Detailed data visualization using Recharts.

Personal Goals: Support for weight loss, weight gain, or weight maintenance modes.

🛠 Technologies

Backend:

Python & Django

Django REST Framework (API)

SQLite (Database)

Frontend:

React.js (Vite)

Bootstrap 5 & Custom CSS

Recharts (Charts)

Axios (API Communication)

📦 Installation

After downloading the project to your computer, follow these steps:

1. Setup
# 1. Backend setup
# Create and activate a virtual environment
python -m venv venv
# For Windows: venv\Scripts\activate
# For Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create the database
python manage.py migrate

# Start the server
python manage.py runserver

2. Frontend Setup
cd frontend

# Install packages
npm install

# Start the application
npm run dev
