from flask import Flask
# create instance of the app
app = Flask(__name__)


@app.route('/')
def homepage():
    return 'Homepage of Flask Calc'


# math = {
#     'add': lambda x, y: x + y,
#     'sub': lambda x, y: x- y
# }
# make a dictionary then return it in the
# results = math[oper](num1,num2)
# return str(result)


@app.route('/add/<num1>/<num2>')
def add(num1, num2):
    try:
        add = int(num1) + int(num2)
        return str(add)
    except ValueError:
        return 'oops'


@app.route('/sub/<num1>/<num2>')
def sub(num1, num2):
    diff = int(num1) - int(num2)
    return str(diff)


@app.route('/mult/<num1>/<num2>')
def multiply(num1, num2):
    product = int(num1) * int(num2)
    return str(product)


@app.route('/div/<num1>/<num2>')
def divide(num1, num2):
    div = int(num1) / int(num2)
    return str(div)


# @app.route('/math/<oper>/<num1>/<num2>')
# def calc(oper, num1, num2):
#     if (oper is 'add'):
#         return add(num1, num2)
#     elif (oper is 'sub'):
#         return sub(num1, num2)
#     elif (oper is 'mult'):
#         return multiply(num1, num2)
#     elif (oper is 'div'):
#         return divide(num1, num2)