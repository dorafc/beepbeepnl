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
    const isLoad = (this.state.loading) ?  <Spinny /> : <AppContent authUser={this.state.authUser} />
    return(
      <div>
        {isLoad}
      </div>
    )
  }
}

function AppContent(props){
  const content = (props.authUser !== null) ? <Booking authUser={props.authUser} /> : <SignedOutData />

  return content;
}

function Spinny(props){
  return <h1>SPINNING WHEEL OF WAITING</h1>
}

// components with data
const SignedOutData = withFirebase(SignedOut)

export default  withFirebase(App);