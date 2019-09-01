import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

import CreateRide from '../CreateRide';
import JoinRide from '../JoinRide';

class Booking extends Component{
  constructor(props) {
    super(props);
    this.state = {
      car : '',
      driver : '',
      alert : ''
    }

    this.updateAlert = this.updateAlert.bind(this)
  }

  // update alert message in state
  updateAlert(alert){
    this.setState({ alert : alert})
  }

  componentDidMount(){
    // test if current authUser has a car a
    const db = this.props.firebase.db
    const userRef = db.collection('users').doc(this.props.authUser.uid);
    userRef.get()
    .then(query => {
      if (query.data().car !== undefined) {
        query.data().car.get()
        .then(carQuery => {
          this.setState({car : carQuery.data(), driver : userRef})
        })
        .catch(error => {
          console.log('Issue getting car name: ' + error)
        })
      } else {
        this.setState({care : ''})
      }
    })
    .catch(error => {
      console.log('Issue getting user data: ' + error)
    })
  }

  componentDidUpdate(){
    // hide any visible alerts
    if (this.state.alert !== ''){
      setTimeout(() => {
        this.setState({ alert : ''})
      }, 3000)
    }
  }

  render() {
    const showCreateRide = (this.state.car) ? <CreateRide car={this.state.car} driver={this.state.driver} alert={this.updateAlert} /> : ''
    return(
      <article className="booking">
        <p>Hello {this.props.authUser.displayName}</p>
        <h5>{this.state.alert}</h5>
        <hr />
        {showCreateRide}
        <JoinRide isDriver={true} toLab={true} />
        <JoinRide isDriver={false} toLab={false} />
      </article>
    )
  }
}

export default withFirebase(Booking);