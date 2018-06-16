from flask import Flask, request, url_for, render_template
from flask_modus import Modus

app = Flask(__name__)
modus = Modus(app)

class Toy:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price

elmo = Toy("elmo", "Elmo", 5)
barbie = Toy("barbie", "Barbie", 12)
hot_wheels = Toy("hw", "Hot Wheels™", 10)

toys = [elmos, barbie, hot_wheels]

# GET     /toys         page about all of our toys
# PUT     /toys         add a new toy
# GET     /toys/elmo    page about elmo
# DELETE  /toys/elmo    delete elmo from list, redirect to list of toys
# PATCH   /toys/elmo    change/edit/update elmo

# OPTION #1

@app.route("/toys", methods=['GET'])
def get_toy_list():
    return render_template("toys.html", toys=toys)

@app.route("/toys", methods=['PUT'])
def add_new_toy():
    # add toy, return back to list

# OPTION #2 

@app.route("/toys", methods=['GET', 'PUT'])
def get_or_put_toys():
    if request.method == "GET":
        return render_template("toys.html", toys=toys)
    elif request.method == "PUT":
        # ...

# /toys/elmo?_method=DELETE
@app.route("/toys/<toy_id>", methods=["DELETE"])
def delete_toy(toy_id):
    # delete toy w/id from list
    # redirect to get_toy_list
