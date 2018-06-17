from flask import Flask, render_template, request, url_for

app = Flask(__name__)


class Game:
    count = 1

    def __init__(self, name, system, rating, id):
        self.name = name
        self.system = system
        self.rating = rating
        self.id = Game.count
        Game.count += 1


@app.route('/')
def home():
    return render_template('home.html')
