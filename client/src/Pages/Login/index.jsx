import React from 'react';
import './style.css';
import Header from './HeaderLogin';
import Form from './Form';

export default function Index() {
  return (
    <div className="container-login">
      <Header></Header>
      <Form></Form>
    </div>
  )
}
