from flask import Flask
app = Flask(__name__)


@app.route('/welcome')
def welcome():
    return "Welcome!"


@app.route('/welcome/home')
def welcome_home():
    return "Welcome home!"


@app.route('/welcome/back')
def welcome_back():
    return "Welcome back!"


@app.route('/sum')
def add():
    sum = 5 + 5
    return str(sum)


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
