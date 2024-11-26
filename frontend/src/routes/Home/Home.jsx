import "./home.scss";
import {NavLink} from "react-router";
import {useUser} from "../../context/UserContext.jsx";

export default function Home() {
    const {username} = useUser();
    return (
        <>
            <h1>Home</h1>
            <div className="button-container">
                <NavLink className="fancy-button" to={'/books'}>Browse</NavLink>
                <NavLink className="fancy-button" to={'/books/upload'}>Upload</NavLink>
                {!username && (
                    <>
                        <NavLink className="fancy-button" to={'/users/login'}>Login</NavLink>
                        <NavLink className="fancy-button" to={'/users/register'}>Register</NavLink>
                    </>
                )}
            </div>
            <p>Welcome to the library!</p>
        </>
    )
}