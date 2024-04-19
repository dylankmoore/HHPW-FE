/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';

const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
};

function Home() {
  const { user } = useAuth();
  return (
    <div>
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: '100vh',
          padding: '10px',
          maxWidth: '500px',
          margin: '0 auto',
          borderTop: '1px solid black',
          position: 'relative',
        }}
      >
        <h1>Hello {user.fbUser.displayName}!</h1>
        <p style={{ fontSize: '14px' }}>Today is {getCurrentDate()}.</p>
        <p style={{ fontSize: '14px' }}>Select one of the options below to get started:</p><br />
        <div style={{ position: 'relative', width: '600px', height: '600px' }}>
          <Image src="/pizza.jpeg" alt="Pizza" layout="fill" objectFit="cover" />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
          }}
          >
            <Link href="/orders">
              <a style={{
                background: 'white',
                color: 'black',
                padding: '10px 20px',
                borderRadius: '5px',
                marginBottom: '20px',
                textDecoration: 'none',
              }}
              >View All Orders
              </a>
            </Link>
            <Link href="/orders/new">
              <a style={{
                background: 'white',
                color: 'black',
                padding: '10px 20px',
                borderRadius: '5px',
                marginBottom: '20px',
                textDecoration: 'none',
              }}
              >Create An Order
              </a>
            </Link>
            <Link href="/revenue">
              <a style={{
                background: 'white',
                color: 'black',
                padding: '10px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
              >View Revenue
              </a>
            </Link>
          </div>
        </div>
      </div><br />
      <footer style={{
        padding: '20px 10px',
        textAlign: 'center',
        borderTop: '1px solid black',
        width: '100%',
        fontFamily: 'monospace',
        fontSize: '14px',
      }}
      >
        HIP HOP, PIZZA, & WANGS, 237 MUSIC ROW, NASHVILLE, TN, 37203 - HHPWFOREVER@GMAIL.COM
      </footer>
    </div>
  );
}

export default Home;
