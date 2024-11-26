from config import db


class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Series(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    published = db.Column(db.Date, unique=False, nullable=False)

    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
    author = db.relationship('Author', backref='book')

    series_id = db.Column(db.Integer, db.ForeignKey('series.id'), nullable=True)
    series = db.relationship('Series', backref='book')

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'published': self.published,
            'author': self.author.to_json(),
            'series': self.series.to_json() if self.series else None
        }


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('review', cascade='all, delete-orphan'))
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    book = db.relationship('Book', backref=db.backref('review', cascade='all, delete-orphan'))
    rating = db.Column(db.Integer, unique=False, nullable=False)
    comment = db.Column(db.String(400), unique=False, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'user': self.user.to_json(),
            'book_id': self.book_id
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username
        }
