import "./review-section.scss";
import ReviewList from "../ReviewList/ReviewList.jsx";
import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useUser} from "../../../context/UserContext.jsx";

export default function ReviewSection({book}) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        const url = `${import.meta.env.VITE_API_URL}/books/${book.id}/reviews`;
        fetch(url)
            .then(response => response.json())
            .then(data => setReviews(data.reviews))
            .catch(error => {
                console.error(error);
                setReviews([])
            });
    }

    const {fetchWithAuth, userId} = useUser();

    const initialValues = {
        rating: 3, // Default value for the rating slider
        comment: "",
    };

    const validationSchema = Yup.object({
        comment: Yup.string()
            .required("Comment is required")
            .min(3, "Comment must be at least 3 characters long."),
    });

    const handleSubmit = (values, {resetForm}) => {
        const {rating, comment} = values;

        const data = {
            rating,
            comment,
            user_id: userId,
            book_id: book.id
        };

        const url = `${import.meta.env.VITE_API_URL}/reviews`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetchWithAuth(url, options)
            .then(res => res.json())
            .then(json => {
                setReviews([...reviews, json.review])
            })
            .catch(e => console.error(e))

        resetForm();
    };

    return (
        <>
            <div className="review-section">
                <h2>Review {book.title}</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({values}) => (
                        <Form className="review-form">
                            <div className="review-form__section">
                                <div className="rating-slider">
                                    <label htmlFor="rating">Rating</label>
                                    <Field
                                        as="input"
                                        type="range"
                                        id="rating"
                                        name="rating"
                                        min="1"
                                        max="5"
                                    />
                                    <span className="rating-value">{values.rating}</span>
                                </div>
                            </div>
                            <div className="review-form__section">
                                <Field
                                    as="textarea"
                                    name="comment"
                                    className="review-form__textarea"
                                    placeholder="Comment..."
                                />
                                <ErrorMessage
                                    name="comment"
                                    component="div"
                                    className="error-message"
                                />
                            </div>
                            <div className="review-form__section">
                                <button type="submit" className="review-form__submit">
                                    Post Review
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <ReviewList reviews={reviews}/>
            </div>
        </>
    );
}