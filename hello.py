from flask import Flask, send_from_directory, render_template
app = Flask(__name__)

@app.route("/")
def index():
  return send_from_directory("./templates", "index.html")

@app.route("/signup")
def signup():
  return send_from_directory("./templates", "signup.html")

@app.route("/employer")
def employer():
  return send_from_directory("./templates", "employer.html")

@app.route("/student")
def student():
  return send_from_directory("./templates", "student.html")

@app.route("/login")
def login():
  return send_from_directory("./templates", "login.html")

if __name__ == "__main__":
  app.run(debug=True)
