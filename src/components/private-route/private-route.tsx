import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.LoginPage} />
  );
}
