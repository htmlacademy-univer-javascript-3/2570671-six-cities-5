import {Link} from 'react-router-dom';
import './not-found-page.css';
import {AppRoute} from '../../const.ts';
import {memo} from 'react';

function NotFoundPage(): JSX.Element {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 Not Found</h1>
      <p className="not-found-text">Sorry, the page you are looking for does not exist.</p>
      <Link to={AppRoute.MainPage} className="not-found-link">
        Back to main page
      </Link>
    </div>
  );
}

const MemoizedNotFoundPage = memo(NotFoundPage);
export default MemoizedNotFoundPage;
