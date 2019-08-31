import React, {Component} from 'react';

class SignedOut extends Component{
  onClick = event => {
    this.props.firebase.doSignInWithRedirect()
  }

  render() {
    return(
      <div className="signIn">
        <h1>Help! I need to get to/from lab</h1>
        <button onClick={this.onClick}>
          Sign In
        </button>
      </div>
    )
  }
}

export default SignedOut;