# FitTrack Pro – Smart Weight & Health Tracking Assistant

![FitTrack Pro Dashboard](https://github.com/user-attachments/assets/e534114b-fe42-4cde-b80a-a1492e200fcd)

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

</div>

<p align="center">
  <strong>FitTrack Pro</strong> is a modern web application designed to help users track weight changes, monitor daily water intake, and achieve health goals with AI-powered insights.
</p>

---

## Features

FitTrack Pro is built to maximize user experience with the following capabilities:

* **Advanced Dashboard:** Track weight, water intake, and personal goals on a single, intuitive screen.
* **AI Coach:** Receive smart feedback based on your weight change pace and water consumption habits.
* **Water Tracking:** Visual water intake tracking with wave animations and the ability to edit historical data.
* **Dark Mode:** A modern, eye-friendly dark theme.
* **Interactive Charts:** Detailed data visualization powered by Recharts.
* **Personal Goals:** Supports multiple modes including weight loss, weight gain, and maintenance.

---

## Technologies

The project is built using a modern and scalable tech stack.

### Backend
* **Language:** Python
* **Framework:** Django & Django REST Framework (API)
* **Database:** SQLite

### Frontend
* **Framework:** React.js (via Vite)
* **Styling:** Bootstrap 5 & Custom CSS
* **Charts:** Recharts
* **API Communication:** Axios

---

## Installation

Follow the steps below to run the project locally.

### 1. Backend Setup

Open your terminal and navigate to the backend directory:

```bash
# Create a virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (Mac / Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Start the backend server
python manage.py runserver
```

### 1. Frontend Setup
cd frontend

# Install dependencies
npm install

# Start the frontend application
npm run dev
