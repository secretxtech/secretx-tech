# SecretX Tech

A futuristic technology website built with Flask.

## Project Structure

```
secretxtech/
├── static/
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   └── contact.css        # Contact page styles
│   └── js/
│       └── main.js            # JavaScript animations
├── templates/
│   ├── index.html             # Home page
│   └── contact.html           # Contact page
├── app.py                     # Flask application
├── requirements.txt           # Python dependencies
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and update the values:
     - `SECRET_KEY`: Generate a secure secret key (you can use: `python -c "import secrets; print(secrets.token_hex(32))"`)
     - `DATABASE_URI`: Database connection string (default: `sqlite:///contacts.db`)
     - `FLASK_DEBUG`: Set to `True` for development, `False` for production

5. Run the application:
   ```bash
   python app.py
   ```

6. Open your browser and navigate to `http://127.0.0.1:5000`

## Security Notes

- **NEVER commit the `.env` file** to version control
- The `.env` file contains sensitive information (secret keys, database credentials)
- Always use `.env.example` as a template for other developers
- Database files (`*.db`) are excluded from git by default

## Features

- **Service Showcase:**
  - 3D Design Services
  - PCB Repair
  - Laptop/PC Distribution
  - Web Development
  - Robotics

- **Contact Form:**
  - Database-backed contact submissions
  - Form validation
  - Success/error flash messages
  - SQLite database storage

- **Futuristic UI:**
  - Minimalist background design
  - Interactive service cards with status ribbons
  - Responsive burger menu
  - Smooth animations and transitions

## License

Copyright 2026 SecretX Tech. All rights reserved.
