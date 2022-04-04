"""Flask app for Cupcakes"""

from flask import Flask, request, jsonify

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

@app.get("/api/cupcakes/<int:cupcake_id>")
def get_cupcake(cupcake_id):
    """ Get data about a single cupcake """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialize = cupcake.serialize()

    return jsonify(cupcake=serialize)

@app.post("/api/cupcakes")
def create_cupcake():
    """ Create a cupcake with flavor,size,rating,image data """

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"] or None

    new_cupcake = Cupcake(flavor=flavor,size=size,rating=rating,image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    serialize = new_cupcake.serialize()

    return (jsonify(cupcake=serialize), 201)

@app.route("/api/cupcakes/<int:cupcake_id>", methods=["PATCH"])
def update_cupcake(cupcake_id):
    """ Update a cupcake; not all fields are required """

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    flavor = request.json.get("flavor") or cupcake.flavor
    size = request.json.get("size") or cupcake.size
    rating = request.json.get("rating") or cupcake.rating
    image = request.json.get("image") or cupcake.image

    cupcake.flavor = flavor
    cupcake.size = size
    cupcake.rating = rating
    cupcake.image = image

    db.session.add(cupcake)
    db.session.commit()

    serialize = cupcake.serialize()

    return jsonify(cupcake=serialize)

@app.delete("/api/cupcakes/<int:cupcake_id>")
def delete_cupcake(cupcake_id):
    """ Delete the cupcake """

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(deleted=cupcake.id)
