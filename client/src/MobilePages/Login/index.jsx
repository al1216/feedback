import React from 'react';
import './style.css';
import Header from './HeaderLogin';
import Form from './Form';

export default function Index() {
  return (
    <div className="container-login-mob">
      <Header></Header>
      <Form></Form>
    </div>
  )
}
