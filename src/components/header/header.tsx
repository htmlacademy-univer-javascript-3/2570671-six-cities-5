import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {memo, SyntheticEvent} from 'react';
import {logoutAction} from '../../store/api-actions.ts';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.user?.email);
  const favoritesQuantity = useAppSelector((state) =>
    state.offers.filter((offer) => offer.isFavorite).length);
  const handleSignOutClick = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.MainPage}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {userEmail === undefined &&
                <li className="header__nav-item user">
                  <Link to={AppRoute.LoginPage} className='header__nav-link header__nav-link--profile'>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              }
              {
                userEmail !== undefined && favoritesQuantity !== undefined &&
                <li className="header__nav-item user">
                  <Link to={AppRoute.FavoritesPage} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{userEmail}</span>
                    <span className="header__favorite-count">{favoritesQuantity}</span>
                  </Link>
                </li>
              }
              {
                userEmail !== undefined &&
                <li className="header__nav-item">
                  <Link
                    to={AppRoute.MainPage}
                    className="header__nav-link"
                    onClick={handleSignOutClick}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);
export default MemoizedHeader;
