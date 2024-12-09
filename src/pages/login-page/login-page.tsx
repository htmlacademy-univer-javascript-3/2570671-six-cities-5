import {AppRoute} from '../../const.ts';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {LoginForm} from '../../components/login-form/login-form.tsx';

function LoginPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.selectedCity);
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.MainPage}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to='/'>
                <span>{selectedCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
