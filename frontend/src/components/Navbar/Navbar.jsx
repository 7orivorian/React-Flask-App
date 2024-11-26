import "./navbar.scss";
import {NavLink} from "react-router";

export default function Navbar() {
    return (
        <div className="navbar">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/books'}>Books</NavLink>
            <NavLink to={'/authors'}>Authors</NavLink>
            <NavLink to={'/users/login'}>Login</NavLink>
        </div>
    )
}