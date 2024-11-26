import "./register.scss";
import {NavLink, useNavigate} from "react-router";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useUser} from "../../context/UserContext.jsx";

export default function Register() {
    const {setCredentials} = useUser();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Username is required")
                .min(3, "Username must be at least 3 characters")
                .max(16, "Username must be 16 characters or less"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters"),
            confirmPassword: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters")
                .oneOf([Yup.ref('password'), null], "Passwords must match"),
        }),
        onSubmit: (values) => {
            const data = {
                username: values.username,
                password: values.password
            };
            const url = `${import.meta.env.VITE_API_URL}/users`;
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
                    setCredentials(json);
                    navigate('/');
                })
                .catch()
        }
    });

    return (
        <>
            <h1>Register</h1>
            <div className="generic-container login-form-container">
                <p>Register an account</p>
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
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="error-message">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>
                    <input type="submit" value="Register"/>
                </form>

                <p>Already have an account? <NavLink to={'/users/login'}>Login</NavLink></p>
            </div>
        </>
    );
}