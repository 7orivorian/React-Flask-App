import "./book-details.scss";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReviewSection from "../../components/review/ReviewSection/ReviewSection.jsx";
import {useBooks} from "../../context/BooksContext.jsx";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function BookDetails() {
    const {removeBook} = useBooks();
    const navigate = useNavigate();
    const location = useLocation();
    const {book} = location.state || {}

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        if (!book) {
            const bookid = location.pathname.split('/')[2];
            const url = `${import.meta.env.VITE_API_URL}/books/${bookid}`
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    location.state = {book: data.book}
                })
                .catch(error => console.error('Error:', error))
        }
    };

    const handleBookUpdate = () => {
        navigate(`/books/${book.id}/update`, {state: {book: book}})
    };

    const handleBookDeletion = () => {
        removeBook(book.id);
        navigate('/');
    };

    const searchForSeries = () => {
        const queryParams = new URLSearchParams({search: `${book.series.name}`}).toString(); // Construct the query string
        navigate(`/books?${queryParams}`); // Navigate to the target page with query string
    };

    if (!book) {
        return <p>Loading...</p>
    }

    const date = new Date(book.published);
    const formattedDate = date.toISOString().split('T')[0];
    return (
        <>
            <h1 className="book-details__title">{book.title}</h1>
            <p className="book-details__author">by {book.author.name}</p>
            <button className="book-details__update" onClick={handleBookUpdate}>Update this Book</button>
            <button className="book-details__delete" onClick={handleBookDeletion}>Delete this Book</button>
            <div className="book-details__section-container">
                <div className="book-details__section">
                    <h3 className="book-details__section-header">Description</h3>
                    <p className="book-details__section-details">{book.description}</p>
                </div>
                <div className="book-details__section">
                    <h3 className="book-details__section-header">Published</h3>
                    <p className="book-details__section-details">{timeAgo.format(date)} on {formattedDate}</p>
                </div>
            </div>
            {book.series && (
                <div className="book-details__section" onClick={searchForSeries}>
                    <h3>Explore this series</h3>
                    <p className="book-details__series">{book.series.name}</p>
                </div>
            )}
            <ReviewSection book={book}/>
        </>
    );
}