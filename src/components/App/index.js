import React, {Component} from 'react';

import SignedOut from '../SignedOut';
import Booking from '../Booking';
import { withFirebase } from '../Firebase';

class App extends Component {
  constructor(props) {
		super(props);
    this.state = {
      authUser: null,
      loading: true
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser, loading: false})
        : this.setState({ authUser: null, loading: false});
    });
  }

  componentWillUnmount() {
    this.listener();  
  }
  
  render(){
    console.log(this.state.loading)
    const isLoad = (this.state.loading) ? <h1>PARTY TIME</h1> : <AppContent authUser={this.state.authUser} />
    return(
      <div>
        {isLoad}
      </div>
    )
  }
}

function AppContent(props){
  const content = (props.authUser !== null) ? <Booking name={props.authUser.displayName} authUser={props.authUser} /> : <SignedOutData />

  return content;
}

// components with data
const SignedOutData = withFirebase(SignedOut)

export default  withFirebase(App);