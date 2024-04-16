/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navi">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img src="/hhpw.png" alt="logo" className="nav-logo me-3" width="100" height="90" />
          </Navbar.Brand>
        </Link>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>&nbsp;
            <Link passHref href="/orders">
              <Nav.Link>View Orders</Nav.Link>
            </Link>&nbsp;
            <Link passHref href="/orders/new">
              <Nav.Link>Create An Order</Nav.Link>
            </Link>&nbsp;
            <Link passHref href="/revenue">
              <Nav.Link>View Revenue</Nav.Link>
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="btn btn-link"
              style={{ paddingLeft: '310px', paddingRight: '0px' }}
            >
              <img
                src="/signoutbtn2.png"
                alt="signout"
                className="nav-logo"
                width="140"
                height="30"
                style={{ cursor: 'pointer' }}
              />
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
