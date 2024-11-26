import "./authors.scss";
import {useState} from "react";
import {useLocation} from "react-router";

export default function Authors() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const key = queryParams.get('search') || "";

    const [authors, setAuthors] = useState([]);
    const [search, setSearch] = useState(key);


    return (
        <>
            <h1>Authors</h1>
        </>
    )
}