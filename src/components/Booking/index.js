import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

import CreateRide from '../CreateRide';
import JoinRide from '../JoinRide';

class Booking extends Component{

  render() {
    return(
      <article className="booking">
        <p>Hello {this.props.authUser.displayName}</p>
        <CreateRide />
        <JoinRide isDriver={true} toLab={true} />
        <JoinRide isDriver={false} toLab={false} />
      </article>
    )
  }
}

export default withFirebase(Booking);