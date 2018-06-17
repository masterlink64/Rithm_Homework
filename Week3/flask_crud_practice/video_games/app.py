from flask import Flask, render_template, request, url_for

app = Flask(__name__)


class Game:
    count = 1

    def __init__(self, name, system, rating):
        self.name = name
        self.system = system
        self.rating = rating
        self.id = Game.count
        Game.count += 1


zelda = Game('Zelda: Breath of the Wild', 'Switch', 97)
horizon = Game('Horizon Zero Dawn', 'PS4', 89)
mario = Game('Super Mario Odyssey', 'Switch', 97)
injustice = Game('Injustice 2', 'Xbox One', 89)

games = [zelda, horizon, mario, injustice]


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/games')
def index():
    return render_template('index.html', games=games)
