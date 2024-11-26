import "./books.scss";
import {useEffect, useState} from "react";
import Book from "../../components/Book/Book.jsx";
import {useLocation} from "react-router";

export default function Books() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const key = queryParams.get('search') || "";

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState(key);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);
            if (response.ok) {
                const data = await response.json();
                setBooks(data.books);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const searchFillCallback = (search) => {
        setSearch(search);
    }

    const displayBooks = books?.filter((book) => {
            const searchString = search.trim().toLowerCase();
            return book.title?.toLowerCase().includes(searchString) ||
                book.author?.name.toLowerCase().includes(searchString) ||
                book.series?.name.toLowerCase().includes(searchString);
        }
    );

    return (
        <>
            <div className="search-container">
                <h1>Search for Books</h1>
                <input className="search-input"
                       type="text"
                       placeholder="Search by Title, Author, or Series"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-clear" onClick={() => setSearch("")}>
                    <svg className={`${search.length > 0 ? "" : "active"}`}
                         xmlns="http://www.w3.org/2000/svg"
                         height="24px" viewBox="0 -960 960 960" width="24px">
                        <path
                            d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/>
                    </svg>
                </button>
            </div>
            {displayBooks && displayBooks.length > 0 ? (
                <ul className="book-list">
                    {displayBooks.map((book) => (
                        <Book key={book.id} book={book} searchFillCallback={searchFillCallback}/>
                    ))}
                </ul>
            ) : (
                <p>No books found.</p>
            )}
        </>
    );
}