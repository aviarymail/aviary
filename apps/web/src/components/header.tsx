import { Link } from 'solid-app-router';

export const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
};
