import {Reviews} from '../../types/review.ts';
import MemoizedReviewItem from '../review-item/review-item.tsx';
import MemoizedReviewSendingForm from '../review-sending-form/review-sending-form.tsx';
import {memo} from 'react';
import {AuthorizationStatus} from '../../const.ts';
import {useAppSelector} from '../../hooks';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

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
      {authorizationStatus === AuthorizationStatus.Auth && <MemoizedReviewSendingForm />}
    </section>
  );
}

const MemoizedReviewsList = memo(ReviewsList);
export default MemoizedReviewsList;


