import "./review.scss";

export default function Review({review}) {
    return (
        <div className="generic-container light review" key={review.id}>
            <div className="review-left">
                <h3>{review.user.username} • {review.rating}</h3>
                <p>{review.comment}</p>
            </div>
        </div>
    );
}