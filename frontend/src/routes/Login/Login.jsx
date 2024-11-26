import "./login.scss";
import {useState} from "react";
import {NavLink} from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    return (
        <>
            <h1>Login</h1>
            <div className="generic-container login-form-container">
                <p>Login to your account</p>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                           placeholder="Username"
                           value={username} onChange={e => setUsername(e.target.value)}
                    />
                    <input type="password"
                           placeholder="Password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Login"/>
                </form>

                <p>Don't have an account? <NavLink to={'/users/register'}>Register</NavLink></p>
            </div>
        </>
    );
}