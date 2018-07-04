from flask import Flask, render_template, request, url_for, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField
from wtforms.validators import InputRequired, Optional, URL, AnyOf, NumberRange
import os
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/pet_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'fasttimesatrithmhigh'
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

db = SQLAlchemy(app)
toolbar = DebugToolbarExtension(app)


# make tables for data base pet_app
class Pet(db.Model):
    __tablename__ = 'pets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text, nullable=True)
    age = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    available = db.Column(db.Boolean, nullable=False, default=True)


# create a form class
# every instance will create field forms for us
class AddPetForm(FlaskForm):
    name = StringField('Pet Name', validators=[InputRequired()])
    # RadioField???
    # [('stored_data', 'Shown on HTML'), etc etc]
    species = StringField(
        'Species',
        validators=[
            AnyOf(
                ['cat', 'dog', 'porcupine'],
                message='only cats dogs or porcupine')
        ])
    photo_url = StringField('Photo URL', validators=[URL()])
    age = FloatField('Age', validators=[NumberRange(0, 30)])
    notes = StringField('Notes')


class EditPetForm(FlaskForm):
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    notes = StringField("Comments", validators=[Optional()])
    available = BooleanField("Available?")


db.create_all()


def get_petfinder_info():
    """get random pet from PetFinder API. returns dict of infor about pet."""
    # key
    pet_key = os.environ['PET_KEY']
    # get info from another API
    real_pets = requests.get('http://api.petfinder.com/pet.getRandom', {
        "key": pet_key,
        "format": "json",
        "output": "basic"
    })
    name = real_pets.json()['petfinder']['pet']['name']['$t']

    real_pic = real_pets.json()['petfinder']['pet']['media']['photos'][
        'photo'][2]['$t']
    return {'name': name, 'real_pic': real_pic}


@app.route('/', methods=['GET'])
def index():
    pets = Pet.query.all()
    pet_info = get_petfinder_info()
    return render_template('index.html', pets=pets, pet_info=pet_info)


@app.route('/add', methods=['GET'])
def show_form():
    # instance of form that we will send to add.html
    form = AddPetForm()
    return render_template('add.html', form=form)


@app.route('/add', methods=['POST'])
def add_pet():
    # instance of form that we will send to add.html
    form = AddPetForm()
    if form.validate_on_submit():
        # new_pet = Pet(**data)
        name = form.data['name']
        species = form.data['species']
        photo_url = form.data['photo_url']
        age = form.data['age']
        notes = form.data['notes']

        new_pet = Pet(
            name=name,
            species=species,
            photo_url=photo_url,
            age=age,
            notes=notes)
        db.session.add(new_pet)
        db.session.commit()
        return redirect(url_for('index'))
    else:
        return render_template('add.html', form=form)


@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def edit_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.notes = form.data['notes']
        pet.available = form.data['available']
        pet.photo_url = form.data['photo_url']
        db.session.commit()
        return redirect(url_for('index'))

    else:
        # failed; re-present form for editing
        return render_template("edit.html", form=form, pet=pet)


@app.route('/api/pets/<int:pet_id>', methods=['GET'])
def api_get_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    info = {'name': pet.name, 'age': pet.age}
    return jsonify(info)
