import {Reviews} from '../../types/review.ts';
import MemoizedReviewItem from '../review-item/review-item.tsx';
import {memo} from 'react';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
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
    </section>
  );
}

const MemoizedReviewsList = memo(ReviewsList);
export default MemoizedReviewsList;


