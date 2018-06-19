import psycopg2
from flask import Flask, request, url_for, render_template, redirect
from flask_modus import Modus
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

DB = "postgresql://localhost/snacks"

app = Flask(__name__)
app.config['SECRET_KEY'] = "abcfggfg"
modus = Modus(app)
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)


class Snack(db.Model):
    __tablename__ = "snacks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True)
    price = db.Column(db.Integer)


# create tables as needed
db.create_all()


@app.route("/snacks")
def snack_list():
    """Show all snacks."""

    snacks = Snack.query.all()  # [<Snack>, <Snack>]
    return render_template("snacks.html", snacks=snacks)


@app.route("/snacks/<int:snack_id>")
def snack_info(snack_id):
    """Info on a snack."""

    snack = Snack.query.filter(Snack.id == snack_id).one()  # <Snack>
    return render_template(..., snack=snack)


@app.route("/snacks/<int:snack_id>", methods=["PATCH"])
def snack_edit(snack_id):
    """Edit a snack."""

    name = request.values.get("name")
    price = float(request.values.get("price"))

    snack = Snack.query.filter(Snack.id == snack_id).one()  # <Snack>
    snack.name = name
    snack.price = price
    # snack.save() <= look up how to update
    db.session.commit()


@app.route("/snacks/add", methods=["GET"])
def add_snack_form():
    """Show form for a new snack."""

    return render_template("add-form.html")


@app.route("/snacks", methods=["POST"])
def add_snack():
    """Add snack and redirect to list."""

    name = request.values.get("name")
    price = float(request.values.get("price"))

    new_snack = Snack(name=name, price=price)
    # new_snack.save()
    db.session.add(new_snack)  # makes INSERT happen
    db.session.commit()

    return redirect(url_for('snack_list'))