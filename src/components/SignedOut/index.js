import React, {Component} from 'react';

class SignedOut extends Component{
  onClick = event => {
    this.props.firebase.doSignInWithRedirect()
  }

  render() {
    return(
      <article className="signIn">
        <h2>Help! I need to get to/from lab</h2>
        <button onClick={this.onClick}>
          Sign In
        </button>
      </article>
    )
  }
}

export default SignedOut;