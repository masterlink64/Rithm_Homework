from flask import Flask, render_template, request, url_for, redirect
from flask_modus import Modus
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://localhost/msg_app"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'fasttimesarerithmhigh'
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

modus = Modus(app)
db = SQLAlchemy(app)
toolbar = DebugToolbarExtension(app)


#  need to create a database for user first
# also need a db for messages
class User(db.Model):
    __tablename__ = 'users'

    # real fields in table
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)

    # virtual "field" SQLA makes
    messages = db.relationship('Message', backref='user')


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


# creating a join table between msgs and tags
msgs_tags = db.Table(
    "msgs_tags", db.Column('id', db.Integer, primary_key=True),
    db.Column('message_id', db.Integer, db.ForeignKey('messages.id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id')))


# class of tags for column
# need to M:M reference
class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.Text)

    messages = db.relationship(
        'Message', secondary='msgs_tags', backref='tags')


db.create_all()


# route for home
@app.route('/')
def home():
    return render_template('home.html')


# route to index
@app.route('/users', methods=['GET'])
def index():
    return render_template('index.html', users=User.query.all())


# route to NEW FORM to submit user data for each column of db
@app.route('/users/new', methods=['GET'])
def new():
    return render_template('new.html')


@app.route('/users', methods=['POST'])
def create():
    # need to create first and last name
    # add and commit to db
    new_user = User(
        first_name=request.values.get('first_name'),
        last_name=request.values.get('last_name'))
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('index'))


@app.route('/users/<int:id>', methods=['GET'])
def show(id):
    found_user = User.query.get_or_404(id)
    return render_template('show.html', user=found_user)


@app.route('/users/<int:id>', methods=['DELETE'])
def destroy(id):
    found_user = User.query.get_or_404(id)
    db.session.delete(found_user)
    db.session.commit()
    return redirect(url_for('index'))


# need to show edit form for user
@app.route('/users/<int:id>/edit', methods=['GET'])
def edit(id):
    found_user = User.query.get_or_404(id)
    return render_template('edit.html', user=found_user)


# update a user will need to access db.session I think?
@app.route("/users/<int:id>", methods=["PATCH"])
def update(id):
    found_user = User.query.get_or_404(id)
    found_user.first_name = request.values.get('first_name')
    found_user.last_name = request.values.get('last_name')
    db.session.add(found_user)
    db.session.commit()
    return redirect(url_for('show', id=found_user.id))


# **** messages routes!!! ****
@app.route('/users/<int:id>/messages', methods=['GET'])
def msg_index(id):
    # this should SHOW all message
    found_user = User.query.get_or_404(id)
    tags = Tag.query.all()
    return render_template('msg_index.html', user=found_user, tags=tags)


# message new so that it takes you to a form to fill out messages
@app.route('/users/<int:id>/messages/new', methods=['GET'])
def msg_new(id):
    user = User.query.get_or_404(id)
    tags = Tag.query.all()
    return render_template('msg_new.html', user=user, tags=tags)


@app.route('/users/<int:id>/messages', methods=['POST'])
def msg_create(id):
    # this should SHOW all message
    found_user = User.query.get_or_404(id)
    new_msg = Message(
        content=request.values.get('content'), user_id=found_user.id)
    # adding M:M feature with tags
    # *** review
    tags_ids = request.form.getlist('tags')  # [1, 2]
    new_tags = Tag.query.filter(
        Tag.id.in_(tags_ids)).all()  # [<Tag 1>, <Tag 2>]
    new_msg.tags = new_tags
    db.session.add(new_msg)
    db.session.commit()
    return redirect(url_for('msg_index', id=found_user.id))


@app.route('/messages/<int:msg_id>', methods=['GET'])
def msg_show(msg_id):
    found_message = Message.query.get_or_404(msg_id)
    return render_template(
        'msg_show.html', msg_id=found_message.id, message=found_message)


@app.route('/messages/<int:msg_id>', methods=['DELETE'])
def msg_destroy(msg_id):
    # grab user id
    # grab msg id? user.message.id
    # remove the msg
    # update your db
    found_message = Message.query.get_or_404(msg_id)
    db.session.delete(found_message)
    db.session.commit()
    return redirect(url_for('msg_index', id=found_message.user_id))


# edit message page
@app.route('/messages/<int:msg_id>/edit', methods=['GET'])
def msg_edit(msg_id):
    found_message = Message.query.get_or_404(msg_id)
    return render_template('msg_edit.html', msg_id=found_message.id)


# form to edit page
# update the msg with patch
@app.route('/messages/<int:msg_id>', methods=['PATCH'])
def msg_update(msg_id):
    found_message = Message.query.get_or_404(msg_id)
    found_message.content = request.values.get('content')
    db.session.add(found_message)
    db.session.commit()
    return redirect(url_for('msg_index', id=found_message.user_id))


# tags routes
@app.route('/tags', methods=['GET'])
def tags_index():
    return render_template('tags_index.html', tags=Tag.query.all())


@app.route('/tags/new', methods=['GET'])
def tags_new():
    return render_template('tags_new.html', tag=Tag.query.all())


@app.route('/tags', methods=['POST'])
def tags_create():
    new_mood = Tag(mood=request.values.get('mood'))
    db.session.add(new_mood)
    db.session.commit()
    return redirect(url_for('tags_index'))


# show individual tags
@app.route('/tags/<int:tag_id>', methods=['GET'])
def tags_show(tag_id):
    found_tag = Tag.query.get_or_404(tag_id)
    return render_template('tags_show.html', tag=found_tag)


# delete tag
@app.route('/tags/<int:tag_id>', methods=['DELETE'])
def tags_destroy(tag_id):
    found_tag = Tag.query.get_or_404(tag_id)
    db.session.delete(found_tag)
    db.session.commit()
    return redirect(url_for('tags_index'))


# edit tag form
@app.route('/tags/<int:tag_id>/edit', methods=['GET'])
def tags_edit(tag_id):
    found_tag = Tag.query.get_or_404(tag_id)
    return render_template('tags_edit.html', tag=found_tag)


# edit tag
@app.route('/tags/<int:tag_id>', methods=['PATCH'])
def tags_update(tag_id):
    found_tag = Tag.query.get_or_404(tag_id)
    found_tag.mood = request.values.get('mood')
    db.session.add(found_tag)
    db.session.commit()
    return (redirect(url_for('tags_show', tag_id=found_tag.id)))
