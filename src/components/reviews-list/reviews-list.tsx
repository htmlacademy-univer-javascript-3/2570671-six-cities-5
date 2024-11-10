import {Reviews} from '../../types/review.ts';
import ReviewItem from '../review-item/review-item.tsx';

type ReviewsListProps = {
  reviews: Reviews | undefined;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  if (!reviews) {
    return <p style={{textAlign: 'center', fontSize: '32px'}}>Be the first to review!</p>;
  }

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
    </ul>
  );
}

export default ReviewsList;


