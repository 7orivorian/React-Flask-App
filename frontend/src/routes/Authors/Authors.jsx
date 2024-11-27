import "./authors.scss";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import Author from "../../components/Author/Author.jsx";

export default function Authors() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const key = queryParams.get('search') || "";

    const [authors, setAuthors] = useState([]);
    const [search, setSearch] = useState(key);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/authors`);
            if (response.ok) {
                const data = await response.json();
                setAuthors(data.authors);
            }
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    };

    const displayAuthors = authors?.filter((author) => {
            const searchString = search.trim().toLowerCase();
            return author.name?.toLowerCase().includes(searchString);
        }
    );

    return (
        <>
            <div className="search-container">
                <h1>Search for Authors</h1>
                <input className="search-input"
                       type="text"
                       placeholder="Search by Author name"
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
            {displayAuthors && displayAuthors.length > 0 ? (
                <ul className="author-list">
                    {displayAuthors.map((author) => (
                        <Author key={author.id} author={author}/>
                    ))}
                </ul>
            ) : (
                <p>No authors found.</p>
            )}
        </>
    );
}