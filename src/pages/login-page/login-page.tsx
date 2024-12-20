import {AppRoute} from '../../const.ts';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions.ts';
import {Auth} from '../../types/auth.ts';
import {ChangeEvent, memo, SyntheticEvent, useCallback, useState} from 'react';

function LoginPage(): JSX.Element {
  const chosenCity = useAppSelector((state) => state.chosenCity);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [auth, setAuth] = useState<Auth>({
    email: '',
    password: '',
  });

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      dispatch(loginAction(auth));
      navigate(AppRoute.MainPage);
    },
    [auth, dispatch, navigate]
  );

  const onEmailChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAuth((prevAuth) => ({
        ...prevAuth,
        email: event.target.value,
      }));
    },
    []
  );

  const onPasswordChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAuth((prevAuth) => ({
        ...prevAuth,
        password: event.target.value,
      }));
    },
    []
  );

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
            <form onSubmit={handleSubmit} className="login__form form">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" value={auth.email}
                  onChange={onEmailChanged} placeholder="Email" required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" value={auth.password}
                  onChange={onPasswordChanged} name="password" placeholder="Password" required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to='/'>
                <span>{chosenCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const MemoizedLoginPage = memo(LoginPage);
export default MemoizedLoginPage;
