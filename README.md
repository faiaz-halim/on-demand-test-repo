# Time Tools Application

A FastAPI-based web application featuring a world clock with timezone selection and a stopwatch with start/stop/pause functionality.

## Features
- Real-time world clock with all available timezones
- Stopwatch with millisecond precision
- Modern responsive design
- Tab-based interface

## Requirements
- Python 3.7+
- pip

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/time-tools.git
   cd time-tools
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application
```bash
uvicorn app.main:app --reload --port 5000
```

The application will be available at: http://localhost:5000

## Usage
- **World Clock Tab**: Select a timezone from the dropdown to see the current time
- **Stopwatch Tab**: Use the buttons to start, stop, pause, or reset the stopwatch

## Project Structure
```
app/
├── main.py            # FastAPI application
├── static/
│   ├── style.css      # CSS styles
│   └── script.js      # JavaScript functionality
└── templates/
    └── index.html     # HTML template
