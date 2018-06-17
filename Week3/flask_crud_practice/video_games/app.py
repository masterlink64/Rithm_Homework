from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)


class Game:
    count = 1

    def __init__(self, name, system, rating):
        self.name = name
        self.system = system
        self.rating = rating
        self.id = Game.count
        Game.count += 1


zelda = Game('Zelda: Breath of the Wild', 'switch', 97)
horizon = Game('Horizon Zero Dawn', 'ps4', 89)
mario = Game('Super Mario Odyssey', 'switch', 97)
injustice = Game('Injustice 2', 'xbone', 89)

games = [zelda, horizon, mario, injustice]


# home page
@app.route('/')
def home():
    return render_template('home.html')


# route to show a list of all the games
@app.route('/games')
def index():
    return render_template('index.html', games=games)


# route to show form to add a game
@app.route('/games/new')
def new():
    return render_template('new.html')


# why is it routing games?
# can this be anything since it's only purpose is to append  a new game?
@app.route('/games', methods=['POST'])
def create():
    new_game = Game(
        request.values.get('name'), request.values.get('system'),
        request.values.get('rating'))
    games.append(new_game)
    return redirect(url_for('index'))