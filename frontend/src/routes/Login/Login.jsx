import "./login.scss";
import {NavLink, useNavigate} from "react-router";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useUser} from "../../context/UserContext.jsx";

export default function Login() {
    const {login} = useUser();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Username is required")
                .min(3, "Username must be at least 3 characters"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters")
        }),
        onSubmit: (values) => {
            const data = {
                username: values.username,
                password: values.password
            };
            const url = `${import.meta.env.VITE_API_URL}/users/login`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    login(json);
                    navigate('/');
                })
                .catch()

        },
    });

    return (
        <>
            <h1>Login</h1>
            <div className="generic-container login-form-container">
                <p>Login to your account</p>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="error-message">{formik.errors.username}</div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error-message">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <input type="submit" value="Login"/>
                </form>

                <p>Don't have an account? <NavLink to={'/users/register'}>Register</NavLink></p>
            </div>
        </>
    );
}