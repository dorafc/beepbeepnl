import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

class Booking extends Component{

  render() {
    return(
      <p>{this.props.authUser.displayName}, U R about to book the TOM taxi</p>
    )
  }
}

export default withFirebase(Booking);