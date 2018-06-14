from flask import Flask, request, render_template
app = Flask(__name__)


@app.route('/')
def homepage():
    return render_template('base.html')


# this router should display the name and age entered for the URL
#  should inherit from base.html
@app.route('/person/<name>/<age>')
def display_name(name, age):
    return render_template('person.html', name=name, age=age)


@app.route('/calculate')
def calculator():
    return render_template('new_calc.html')


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


@app.route('/math')
def calc():
    num1 = request.args.get('num1')
    num2 = request.args.get('num2')
    oper = request.args.get('dropdown')
    if (oper == 'add'):
        return add(num1, num2)
    elif (oper == 'sub'):
        return sub(num1, num2)
    elif (oper == 'mult'):
        return multiply(num1, num2)
    elif (oper == 'div'):
        return divide(num1, num2)
