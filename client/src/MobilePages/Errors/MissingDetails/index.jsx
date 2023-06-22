import React from 'react';
import './style.css';
import Header from './Header';
import Message from './Message';

export default function Index() {
  return (
    <div className="container-message-mob">
      <Header></Header>
      <Message></Message>
    </div>
  )
}
