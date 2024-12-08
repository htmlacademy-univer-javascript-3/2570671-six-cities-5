import {Reviews} from '../../types/review.ts';
import ReviewItem from '../review-item/review-item.tsx';
import ReviewSendingForm from '../review-sending-form/review-sending-form.tsx';

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
              <ReviewItem
                key={review.id}
                review={review}
              />)
            )
        }
      </ul>
      <ReviewSendingForm />
    </section>
  );
}

export default ReviewsList;


