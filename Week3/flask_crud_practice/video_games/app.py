from flask import Flask, render_template, request, url_for, redirect
from flask_modus import Modus
import psycopg2
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
Modus(app)
app.config['SECRET_KEY'] = "abc123"
toolbar = DebugToolbarExtension(app)

# DB global variable for the data base
DB = "postgresql://localhost/video_games"
app.config['SQLALCHEMY_DATABASE_URI'] = DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)


class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True)
    rating = db.Column(db.Text)
    system = db.Column(db.Text)

    # self.name = name
    # self.system = system
    # self.rating = rating


# create tables as needed
# will only create tables if it does NOT exist
# if we want to add new columns we will need to alter
db.create_all()


# home page
@app.route('/')
def home():
    return render_template('home.html')


# route to show a list of all the games
@app.route('/games')
def index():
    games = Game.query.all()
    return render_template('index.html', games=games)


# route to show form to add a game
@app.route('/games/new')
def new():
    return render_template('new.html')


# why is it routing games?
# can this be anything since it's only purpose is to append  a new game?
@app.route('/games', methods=['POST'])
def create():
    # this is how you grab the values from the form with flask
    name = request.values.get('name')
    system = request.values.get('system')
    rating = request.values.get('rating')
    # create a new game using the MODEL
    new_game = Game(name=name, system=system, rating=rating)
    db.session.add(new_game)
    db.session.commit()
    return redirect(url_for('index'))


@app.route('/games/<int:id>', methods=['GET'])
def show(id):
    # need to grab id somehow to add to route
    #found_game = [game for game in games if id == game.id][0]
    # SQLAlchemy to grab the id from the given one
    found_game = Game.query.filter(Game.id == id).one()
    return render_template('show.html', game=found_game)


@app.route('/games/<int:id>', methods=["DELETE"])
def destroy(id):
    # need to grab id again
    # this time we will remove from list
    # the button on the show.html will activate this function
    # this function will then grab the id of the game from the url and then run the function
    found_game = [game for game in games if id == game.id][0]
    games.remove(found_game)
    return redirect(url_for('index'))


# form to edit
@app.route('/games/<int:id>/edit', methods=['GET'])
def edit(id):
    found_game = [game for game in games if id == game.id][0]
    return render_template('edit.html', game=found_game)


@app.route("/games/<int:id>", methods=["PATCH"])
def update(id):
    found_game = [game for game in games if game.id == id][0]
    found_game.name = request.values.get('name')
    found_game.system = request.values.get('system')
    found_game.rating = request.values.get('rating')
    return redirect(url_for('show', id=found_game.id))
