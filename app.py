"""Flask app for Cupcakes"""

from flask import Flask, redirect, render_template, flash, jsonify

from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"


@app.get("/api/cupcakes")
def get_all_cupcakes():
    """ Get data about all cupcakes """

    cupcakes = Cupcake.query.all()
    serialize = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialize)