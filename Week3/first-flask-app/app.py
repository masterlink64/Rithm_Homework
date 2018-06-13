from flask import Flask, render_template

# convention to call it app!
# need to have dunder name to tell you what is the name to Flask
#
app = Flask(__name__)


# app is the instace, route will if you go to "/" it will make function run
# @app.route is a decorator that will route you to do different things depending on URL
@app.route('/')
# this is a view
def homepage():
    games = ['Zelda: BotW', 'Horizon Zero Dawn', 'Witcher 3']
    return render_template(
        'welcome.html', lucky_number=lucky(), age=21, games=games)


@app.route('/bye')
def say_goodbye():
    # whatever matters to your browser is what you return
    return "So sorry you have to go! Bye!"


@app.route('/catan')
def play_catan():
    return 'YAY!!!'


@app.route('/lucky-num')
def lucky():
    from random import randint
    num = randint(1, 100)
    return str(num)


@app.route('/say/<msg>/<times>')
def greet(msg, times):
    try:
        ntimes: int(times)
    except ValueError:
        ntimes = 1
    return f'Hello! {msg}' * ntimes