import {useNavigate} from "react-router";
import {useUser} from "../../context/UserContext.jsx";

export default function Logout() {
    const {logout} = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/users/login');
    };

    return (
        <>
            <h1>Logout</h1>
            <p>Are you sure you wish to log out?</p>
            <button onClick={handleLogout}>Yes, Logout</button>
            <button>No, stay logged in</button>
        </>
    );
}