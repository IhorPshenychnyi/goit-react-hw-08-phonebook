import { useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth';

const styles = {
  title: {
    marginTop: 30,
    fontWeight: 500,
    fontSize: 40,
    textAlign: 'center',
  },
};

export default function HomeView() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? (
    <h1 style={styles.title}> Wellcome </h1>
  ) : (
    <h1 style={styles.title}>Please log in or sign up</h1>
  );
}
