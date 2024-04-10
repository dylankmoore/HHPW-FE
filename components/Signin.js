/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div id="authpage">
      <img src="/hhpw.png" alt="logo" className="nav-logo" width="300" height="300" /><br /><br />
      <Button type="button" id="signin" className="copy-btn raise" onClick={signIn}>
        sign in
      </Button><br />
      <br /><br /><br />
    </div>
  );
}

export default Signin;
