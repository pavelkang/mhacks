from flask import Flask, send_from_directory, render_template, jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy
import phpass
import os

basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'db.sqlite')
schema_path = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')

hasher = phpass.PasswordHash(8, False)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = schema_path
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

db = SQLAlchemy(app)

class User(db.Model):
  __tablename__ = 'users'

  def __init__(self, username, password, email, role):
    self.username = username
    self.password = password
    self.email = email
    self.role = role

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64), unique=True, index=True)
  password = db.Column(db.String(100))
  email = db.Column(db.String(64))
  role = db.Column(db.Integer)

  def __repr__(self):
    return '<User %r>' % self.username

class Problem(db.Model):
  __tablename__ = 'problems'
  id = db.Column(db.Integer, primary_key=True)
  sourceLang = db.Column(db.String(10))
  destLang = db.Column(db.String(10))
  translations = db.relationship("Translation", backref="translations")

class Translation(db.Model):
  __tablename__ = 'translations'

  def __init__(self, problem, content):
    self.problem = problem
    self.content = content

  id = db.Column(db.Integer, primary_key=True)
  problem = db.Column(db.Integer, db.ForeignKey("problems.id"))
  content = db.Column(db.String(500))

class TranslationVotes(db.Model):
  __tablename__ = 'translation_votes'
  id = db.Column(db.Integer, primary_key=True)
  choice_id = db.Column(db.Integer)
  problem = db.Column(db.Integer, db.ForeignKey("problems.id"))
  translation = db.Column(db.Integer, db.ForeignKey("translations.id"))
  vote_count = db.Column(db.Integer)

if not os.path.exists(db_path) or not os.path.isfile(db_path):
  db.create_all()

def make_error(error_msg):
  assert type(error_msg) is str
  return { "idt" : "error", "error" : error_msg }

def make_success():
  return { "idt" : "data" }

@app.route("/api/signup", methods=["POST"])
def api_signup():
  username = request.form['username']
  password = request.form['password']
  email = request.form['email']
  role = request.form['role']
  assert role == 'stu' or role == 'emp'
  hashed_pass = hasher.hash_password(password)
  if User.query.filter_by(username=username).count() > 0:
    return jsonify(**make_error("User with designated username already exists."))
  new_user = User(username, hashed_pass, email, role)
  db.session.add(new_user)
  db.session.commit()
  return jsonify(**make_success())

@app.route("/api/login", methods=["POST"])
def api_login():
  user_result = User.query.filter_by(username=request.form['username'])
  if user_result.count() == 0:
    return jsonify(**make_error("Entered username does not exist."))
  hashed_pass = user_result.first().password
  if not hasher.check_password(request.form['password'], hashed_pass):
    return jsonify(**make_error("Password does not match."))
  return jsonify(**make_success())

@app.route("/api/translation_history", methods=["GET"])
def api_translation_history():
  translation_history = Translation.query.all()
  translations = []
  for entry in translation_history:
    translations.append({ "id" : entry.id, "problem" : entry.problem, "content" : entry.content })
  return jsonify(**{ 
    "idt" : "data", 
    "data" : translations
  })

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
