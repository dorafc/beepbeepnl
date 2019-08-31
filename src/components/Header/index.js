import React from 'react';
import SignOutBtn from '../SignOutBtn';

function Header(props){
  const signOut = (props.authUser !== null) ? <SignOutBtn /> : ""
  return(
    <header>
      <h1>Beep Beep NL</h1>
      {signOut}
      <hr />
    </header>
  )
}

export default Header