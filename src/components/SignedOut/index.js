import React, {Component} from 'react';

class SignedOut extends Component{
  onClick = event => {
    this.props.firebase.doSignInWithRedirect()
  }

  render() {
    return(
      <article className="signIn">
        <h2>A passion for (not) abandoning people at Ronkonkoma Train Station</h2>
        <button onClick={this.onClick}>
          Sign In
        </button>
      </article>
    )
  }
}

export default SignedOut;