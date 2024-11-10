import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {OfferPreviews} from '../../types/offer-preview.ts';
import {Offers} from '../../types/offer.ts';

export type HeaderProps = {
  offers: OfferPreviews | Offers;
};

function Header({offers}: HeaderProps): JSX.Element {
  const favoritesQuantity = offers.filter((offer) => offer.isBookmarked).length;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FavoritesPage}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            <span className="header__favorite-count">{favoritesQuantity}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
