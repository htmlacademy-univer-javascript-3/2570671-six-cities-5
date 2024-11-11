import {Reviews} from '../../types/review.ts';
import ReviewItem from '../review-item/review-item.tsx';

type ReviewsListProps = {
  reviews: Reviews | undefined;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <div>
      {reviews ? (
        <ul className="reviews__list">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
            />
          ))}
        </ul>
      ) : (
        <p style={{textAlign: 'center', fontSize: '32px'}}>
              Be the first to review!
        </p>
      )}
    </div>
  );
}

export default ReviewsList;


