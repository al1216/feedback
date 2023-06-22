import React from 'react';
import './style.css';
import Header from './HeaderSignUp';
import Form from './Form';

export default function Index() {
  return (
    <div className="container-signup-mob">
      <Header></Header>
      <Form></Form>
    </div>
  )
}
