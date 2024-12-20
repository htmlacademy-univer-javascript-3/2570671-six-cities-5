import {ChangeEvent, memo, SyntheticEvent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../store';
import {AppState} from '../../store/reducer.ts';
import {MIN_RATING, REVIEW_COMMENT_MAX_LENGTH, REVIEW_COMMENT_MIN_LENGTH} from '../../const.ts';
import {addReviewAction} from '../../store/api-actions.ts';
import {updateComment, updateRating} from '../../store/action.ts';

type ReviewSendingFormProps = {
  offerId: string;
}

function ReviewSendingForm({offerId}: ReviewSendingFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isReviewSending = useSelector<AppState, boolean>((state) => state.chosenOffer?.isReviewSending ?? false);
  const comment = useSelector<AppState, string>((state) => state.comment);
  const rating = useSelector<AppState, number>((state) => state.rating);

  const notMeetCriteria = comment.length < REVIEW_COMMENT_MIN_LENGTH || rating < MIN_RATING;

  const handleSubmit = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(addReviewAction({offerId, comment, rating}));
  }, [dispatch, offerId, comment, rating]);

  const handleCommentChange = useCallback(({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateComment(value));
  }, [dispatch]);

  const handleRatingChange = useCallback(({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateRating(+value));
  }, [dispatch]);

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div
        className="reviews__rating-form form__rating"
        onChange={handleRatingChange}
      >
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        maxLength={REVIEW_COMMENT_MAX_LENGTH}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentChange}
        disabled={isReviewSending}
        value={comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={notMeetCriteria || isReviewSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

const MemoizedReviewSendingForm = memo(ReviewSendingForm);
export default MemoizedReviewSendingForm;
