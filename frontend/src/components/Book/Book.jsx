import "./book.scss";
import {useNavigate} from "react-router";

export default function Book({books, book, searchFillCallback}) {
    const navigate = useNavigate();

    const date = new Date(book.published).toISOString().split('T')[0];

    const authorName = book.author?.name;
    const seriesName = book.series?.name;

    return (
        <li className="book" key={book.id}
            onClick={() => navigate(`/books/${book.id}`, {state: {book: book}})}>
            <div className="book-title-container">
                <h3 className="book-title">{book.title}</h3>
                {book.series && (
                    <p className="book-series" onClick={() => searchFillCallback(seriesName)}>{seriesName}</p>
                )}
            </div>
            <p className="book-description">{book.description}</p>
            <div className="small-details">
                <p className="small-details__author" onClick={() => searchFillCallback(authorName)}>{authorName}</p>
                <p className="small-details__sep">•</p>
                <p className="small-details__date">{date}</p>
            </div>
        </li>
    )
}