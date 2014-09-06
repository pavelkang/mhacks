from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/signup")
def signup():
  return render_template("signup.html")

@app.route("/employer")
def employer():
  return render_template("employer.html")

@app.route("/student")
def student():
  return render_template("student.html")

@app.route("/login")
def login():
  return render_template("login.html")

if __name__ == "__main__":
  app.run()