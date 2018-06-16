from flask import Flask, request, url_for, render_template, redirect
from flask_modus import Modus

app = Flask(__name__)
modus = Modus(app)


# we need a resource
# making class need self
class Snack:
    count = 1

    def __init__(self, name, kind):
        self.name = name
        self.kind = kind
        self.id = Snack.count
        Snack.count += 1


snicker = Snack('Snickers', 'candy')
granola = Snack('Granola Bar', 'cracker')
ruffles = Snack('Ruffles', 'chip')
twix = Snack('Twix', 'candy')
oreo = Snack("Oreo Double Stuff", "cookie")
ritz = Snack("Ritz Cracker", "cracker")
apple = Snack("Fuji apple", "fruit")
snicker = Snack("Snickers Bar", "candy")
doritos = Snack("Doritos", "chip")

snacks = [oreo, ritz, apple, snicker, doritos, granola, ruffles, twix]


@app.route("/snacks", methods=['GET'])
def get_snacks_list():
    # need to name snacks because that is how flask will render
    # also gives our html page access to snacks!
    return render_template("index.html", snacks=snacks)


@app.route("/snacks/add", methods=['GET'])
def show_new_snack_form():
    return render_template('add_snack.html')


@app.route("/snacks/new", methods=['POST'])
def add_new_snack():
    snacks.append(Snack(request.form['snackname'], request.form['kind']))
    # snack_name = request.values.get('snackname')
    # snack_kind = request.values.get('kind')
    # id = len(snacks)
    # new_snack = Snack(id, snack_name, snack_kind)
    # snacks.append(new_snack)
    return redirect(url_for('get_snacks_list'))


@app.route('/snacks/<int:id>')
def show_new_snack(id):
    # find a snack based on its id
    # for snack in snacks:
    #     if snack.id == id:
    #         found_snack = snack
    # refactored
    found_snack = [snack for snack in snacks if snack.id == id][0]
    return render_template('show.html', snack=found_snack)


# request and route for patch
@app.route('/snacks/<int:id>', methods=["PATCH"])
def show_edited_snack(id):
    found_snack = next(snack for snack in snacks if snack.id == id)
    found_snack.name = request.form['name']

    return redirect(url_for('get_snacks_list'))


# need to route for editing
@app.route('/snacks/<int:id>/edit')
def edit(id):
    found_snack = [snack for snack in snacks if snack.id == id][0]
    return render_template('edit.html', snack=found_snack)


@app.route('/snacks/<int:id>/delete', methods=["DELETE"])
def delete(id):
    found_snack = [snack for snack in snacks if snack.id == id][0]
    snacks.remove(found_snack)
    return redirect(url_for('get_snacks_list'))


# @app.route("/snacks/delete", methods=['DELETE'])
# def delete_snack():
#     snack_name = request.values.get('snackname')
#     snack_kind = request.values.get('kind')

# add snack,
# what route?
# get data from form create a snack item
# and add to our snacks list
# return back to list
