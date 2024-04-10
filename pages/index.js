import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '50vh',
        padding: '20px',
        maxWidth: '450px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Choose one of the options below to get started.</p><br />
      <Link href="/orders">
        View All Orders
      </Link>
      <Link href="/orders/new">
        Create An Order
      </Link>
      <Link href="/revenue">
        View Revenue
      </Link>
    </div>
  );
}

export default Home;
