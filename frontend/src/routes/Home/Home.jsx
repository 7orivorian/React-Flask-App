import "./home.scss";
import {NavLink} from "react-router";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <div className="button-container">
                <NavLink className="fancy-button" to={'/books'}>Browse</NavLink>
                <NavLink className="fancy-button" to={'/books/upload'}>Upload</NavLink>
                <NavLink className="fancy-button" to={'/users/login'}>Login</NavLink>
                <NavLink className="fancy-button" to={'/users/register'}>Register</NavLink>
            </div>
            <p>Welcome to the library!</p>
        </>
    )
}