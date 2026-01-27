from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback-secret-key')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        flash('Message sent successfully! We\'ll get back to you soon.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')
