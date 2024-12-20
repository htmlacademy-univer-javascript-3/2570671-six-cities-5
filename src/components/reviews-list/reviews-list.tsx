import {Reviews} from '../../types/review.ts';
import MemoizedReviewItem from '../review-item/review-item.tsx';
import {memo} from 'react';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        reviews
          .map((review) => (
            <MemoizedReviewItem
              key={review.id}
              review={review}
            />)
          )
      }
    </ul>
  );
}

const MemoizedReviewsList = memo(ReviewsList);
export default MemoizedReviewsList;


