import {Link} from 'react-router-dom';
import './not-found-page.css';
import {AppRoute} from '../../const.ts';

function NotFoundPage(): JSX.Element {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 Not Found</h1>
      <p className="not-found-text">Извините, страница, которую вы ищете, не существует.</p>
      <Link to={AppRoute.MainPage}>
        Вернуться на главную страницу
      </Link>
    </div>
  );
}

export default NotFoundPage;