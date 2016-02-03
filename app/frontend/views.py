from flask import Flask, render_template

frontend_app = Flask(__name__,
                 template_folder='templates',
                 static_folder='static')

@frontend_app.route('/')
def main():
    return render_template("main-index.html")
