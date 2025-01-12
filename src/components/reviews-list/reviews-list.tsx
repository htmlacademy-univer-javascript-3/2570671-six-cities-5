import {Reviews} from '../../types/review.ts';
import MemoizedReviewItem from '../review-item/review-item.tsx';
import {memo} from 'react';
import {REVIEW_COUNT_MAX, REVIEW_COUNT_MIN} from '../../const.ts';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        reviews
          .slice(REVIEW_COUNT_MIN, REVIEW_COUNT_MAX)
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


