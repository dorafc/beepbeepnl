import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

import CreateRide from '../CreateRide';

class Booking extends Component{

  render() {
    return(
      <article className="booking">
        <p>Hello {this.props.authUser.displayName}</p>
        <CreateRide />
      </article>
    )
  }
}

export default withFirebase(Booking);