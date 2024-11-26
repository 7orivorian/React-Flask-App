from datetime import datetime

from flask import jsonify, request

from config import app, db
from models import Author, Book, User, Review, Series


@app.route('/authors', methods=['GET'])
def get_authors():
    authors = Author.query.all()
    json_authors = list(map(lambda x: x.to_json(), authors))
    return jsonify({'authors': json_authors})


@app.route('/authors', methods=['POST'])
def add_author():
    data = request.get_json()
    author = Author(name=data['name'])
    db.session.add(author)
    db.session.commit()
    return jsonify({'message': 'Author added successfully!'})


@app.route('/series', methods=['GET'])
def get_series():
    series = Series.query.all()
    json_series = list(map(lambda x: x.to_json(), series))
    return jsonify({'series': json_series})


@app.route('/series', methods=['POST'])
def add_series():
    data = request.get_json()
    series = Series(name=data['name'])
    db.session.add(series)
    db.session.commit()
    return jsonify({'message': 'Series added successfully!'})


@app.route('/batchaddauthors', methods=['POST'])
def batch_add_authors():
    data = request.get_json()

    authors = data.get('authors')
    if not authors:
        return jsonify({'error': 'No authors provided!'}), 400

    for author_data in authors:
        author = Author(name=author_data['name'])
        db.session.add(author)
        db.session.commit()
    return jsonify({'message': 'Authors added successfully!'})


@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    json_books = list(map(lambda x: x.to_json(), books))
    return jsonify({'books': json_books})


@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)
    return jsonify({'book': book.to_json()})


@app.route('/books/<string:title>', methods=['GET'])
def get_book_by_title(title):
    book = Book.query.filter_by(title=title).first()
    return jsonify({'book': book.to_json()})


@app.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()

    # Parse published date
    published_date = datetime.strptime(data['published'], '%Y-%m-%d').date()

    # Check if author exists by name or create a new one
    author = Author.query.filter_by(name=data['author_name']).first()
    if not author:
        author = Author(name=data['author_name'])
        db.session.add(author)
        db.session.commit()  # Commit to get the author an ID

    series_name = data.get('series_name')
    series = None
    if series_name:
        # Check if series exists by name or create a new one
        series = Series.query.filter_by(name=series_name).first()
        if not series:
            series = Series(name=series_name)
            db.session.add(series)
            db.session.commit()  # Commit to get the series an ID

    # Create new book instance
    book = Book(
        title=data['title'],
        description=data['description'],
        published=published_date,
        author_id=author.id,
        series_id=series.id if series else None
    )
    db.session.add(book)
    db.session.commit()

    return jsonify({'message': 'Book added successfully!', 'book_id': book.id})



@app.route('/batchaddbooks', methods=['POST'])
def batch_add_books():
    data = request.get_json()
    books = data['books']

    for book_data in books:
        # Parse published date
        published_date = datetime.strptime(book_data['published'], '%Y-%m-%d').date()

        # Create new book instance
        book = Book(
            title=book_data['title'],
            description=book_data['description'],
            published=published_date,
            author_id=book_data['author_id'],
            series_id=book_data.get('series_id')  # Optional series reference
        )
        db.session.add(book)
        db.session.commit()

    return jsonify({'message': 'Books added successfully!'})


@app.route('/books/<int:book_id>', methods=['PATCH'])
def update_book(book_id):
    data = request.get_json()

    # Fetch the book to update
    book = Book.query.get(book_id)
    if not book:
        return jsonify({'error': 'Book not found!'}), 404

    # Update book fields
    if data.get('title'):
        book.title = data.get('title')
    if data.get('description'):
        book.description = data.get('description')
    if data.get('published'):
        # Parse published date
        published_date = datetime.strptime(data.get('published'), '%Y-%m-%d').date()
        book.published = published_date
    if data.get('author_id'):
        book.author_id = data.get('author_id')
    if data.get('prequel_id'):
        book.prequel_id = data.get('prequel_id')
    if data.get('sequel_id'):
        book.sequel_id = data.get('sequel_id')

    db.session.commit()
    return jsonify({'message': 'Book updated successfully!'})


@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted successfully!'})


@app.route('/users/<string:username>', methods=['GET'])
def get_user(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 404
    return jsonify({'user': user.to_json()})


@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    user = User(username=data['username'], password=data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User added successfully!'})


@app.route('/books/<int:book_id>/reviews', methods=['GET'])
def get_reviews(book_id):
    reviews = Review.query.filter_by(book_id=book_id).all()
    json_reviews = list(map(lambda x: x.to_json(), reviews))
    return jsonify({'reviews': json_reviews})


@app.route('/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    review = Review(book_id=data['book_id'], user_id=data['user_id'], rating=data['rating'], comment=data['comment'])
    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review added successfully!'})


def initialize_db():
    with app.app_context():
        db.create_all()


if __name__ == '__main__':
    initialize_db()
    app.run(debug=True)
