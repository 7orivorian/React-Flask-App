import "./navbar.scss";
import {NavLink, useNavigate} from "react-router";
import {useUser} from "../../context/UserContext.jsx";

export default function Navbar() {
    const {username, logout} = useUser();
    useNavigate()

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="navbar">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/books'}>Books</NavLink>
            <NavLink to={'/authors'}>Authors</NavLink>
            <NavLink to={'/users/login'}>Login</NavLink>
        </div>
    )
}