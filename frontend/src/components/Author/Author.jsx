import "./author.scss";
import {useNavigate} from "react-router";

export default function Author({author}) {
    const navigate = useNavigate();

    const searchForAuthor = () => {
        const queryParams = new URLSearchParams({search: `${author.name}`}).toString(); // Construct the query string
        navigate(`/books?${queryParams}`); // Navigate to the target page with query string
    };

    return (
        <li className="author" key={author.id} onClick={searchForAuthor}>
            <div className="author-title-container">
                <h3 className="author-title">{author.name}</h3>
            </div>
        </li>
    )
}