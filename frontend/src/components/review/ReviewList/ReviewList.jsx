import "./review-list.scss";
import {useEffect, useState} from "react";
import Review from "../Review/Review.jsx";

export default function ReviewList({bookId}) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        const url = `http://127.0.0.1:5000/books/${bookId}/reviews`;
        fetch(url)
            .then(response => response.json())
            .then(data => setReviews(data.reviews))
            .catch(error => {
                console.error(error);
                setReviews([])
            });
    }

    return (
        <>
            <h2>Reviews</h2>
            {reviews.length === 0 ?
                <p>Be the first to leave a review!</p> :
                <div className="review-list">
                    {reviews.map((review) => (
                        <Review key={review.id} review={review}/>
                    ))}
                </div>
            }
        </>
    );
}