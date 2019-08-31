import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class SignOutBtn extends Component{
  onClick = event => {
    event.preventDefault();
    this.props.firebase.doSignOut();
  };

  render(){
    return(
      <button onClick={this.onClick}>
        Sign Out
      </button>
    )
  }
}

export default withFirebase(SignOutBtn);