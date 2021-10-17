import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { authOperations, authSelectors } from './redux/auth';

const HomeView = lazy(() =>
  import('./views/HomeView' /*webpackChunkName: 'home-page' */),
);
const LoginView = lazy(() =>
  import('./views/LoginView' /*webpackChunkName: 'login-page' */),
);
const PhonebookView = lazy(() =>
  import('./views/PhonebookView' /*webpackChunkName: 'phonebook' */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /*webpackChunkName: 'register-page' */),
);

function App() {
  const dispatch = useDispatch();
  const isRefreshingUser = useSelector(authSelectors.getIsRefreshingUser);

  useEffect(() => {
    dispatch(authOperations.refreshCurrentUser());
  }, [dispatch]);

  return (
    !isRefreshingUser && (
      <Container>
        <AppBar />

        <Switch>
          <Suspense fallback={<p>Loading...</p>}>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>

            <PublicRoute path="/register" restricted>
              <RegisterView />
            </PublicRoute>

            <PublicRoute path="/login" redirectTo="/phonebook" restricted>
              <LoginView />
            </PublicRoute>

            <PrivateRoute path="/phonebook" redirectTo="/login">
              <PhonebookView />
            </PrivateRoute>
          </Suspense>
        </Switch>
      </Container>
    )
  );
}

export default App;
