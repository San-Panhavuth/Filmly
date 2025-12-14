import HomePage from '../src/view/home/HomePage';
import PasswordResetRedirect from '../src/components/PasswordResetRedirect';

export default function RootHome() {
  return (
    <>
      <PasswordResetRedirect />
      <HomePage />
    </>
  );
}
