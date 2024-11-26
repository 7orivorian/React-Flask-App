import "./review-list.scss";
import Review from "../Review/Review.jsx";

export default function ReviewList({reviews}) {
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