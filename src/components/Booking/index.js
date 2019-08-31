import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

import SignOutBtn from '../SignOutBtn';

class Booking extends Component{

  render() {
    return(
      <div className="booking">
        <p>{this.props.authUser.displayName}, U R about to book the TOM taxi</p>
        <SignOutBtn />
      </div>
    )
  }
}

export default withFirebase(Booking);