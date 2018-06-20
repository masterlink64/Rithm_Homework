from flask import Flask, render_template, request, url_for, redirect
from flask_modus import Modus
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://localhost/msg_app"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'fasttimesarerithmhigh'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

modus = Modus(app)
db = SQLAlchemy(app)
toolbar = DebugToolbarExtension(app)


#  need to create a database for user first
# also need a db for messages
class User(db.Model):
    __tablename__ = 'users'

    # real fields in table
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)

    # virtual "field" SQLA makes
    messages = db.relationship('Message', backref='user')


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


db.create_all()


# route for home
@app.route('/')
def home():
    return render_template('home.html')


# route to index
@app.route('/users', methods=['GET'])
def index():
    return render_template('index.html', users=User.query.all())


# route to NEW FORM to submit user data for each column of db
@app.route('/users/new', methods=['GET'])
def new():
    return render_template('new.html')


@app.route('/users', methods=['POST'])
def create():
    # need to create first and last name
    # add and commit to db
    new_user = User(
        first_name=request.values.get('first_name'),
        last_name=request.values.get('last_name'))
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('index'))


@app.route('/users/<int:id>', methods=['GET'])
def show(id):
    found_user = User.query.get_or_404(id)
    return render_template('show.html', user=found_user)


@app.route('/users/<int:id>', methods=['DELETE'])
def destroy(id):
    found_user = User.query.get_or_404(id)
    db.session.delete(found_user)
    db.session.commit()
    return redirect(url_for('index'))


@app.route('/users/<int:id>/edit', methods=['PATCH'])
def update(id):
    return redirect(url_for('index'))
