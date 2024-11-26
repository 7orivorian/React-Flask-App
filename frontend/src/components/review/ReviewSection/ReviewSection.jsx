import "./review-section.scss";
import ReviewList from "../ReviewList/ReviewList.jsx";
import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export default function ReviewSection({book}) {
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
        // Logic to save the review (e.g., call an API or update state)
        console.log("Review submitted:", {rating, comment});
        resetForm(); // Reset form after submission
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
                <ReviewList bookId={book.id}/>
            </div>
        </>
    );
}