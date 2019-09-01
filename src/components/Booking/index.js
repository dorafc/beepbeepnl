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
      alert : '',
      rides : []
    }

    this.updateAlert = this.updateAlert.bind(this)
  }

  // update alert message in state
  updateAlert(alert){
    this.setState({ alert : alert})
  }

  componentDidMount(){
    // get data from the db
    const db = this.props.firebase.db

    // test if current authUser has a car a
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

    // get list of rides currently in the app
    const rideRef = db.collection('rides')
    rideRef.onSnapshot(query => {
      this.setState({ rides : query.docs })
    })
  }

  componentDidUpdate(){
    // hide any visible alerts
    if (this.state.alert !== ''){
      setTimeout(() => {
        this.setState({ alert : ''})
      }, 3000)
    }

    // update rides
  }

  render() {
    const showCreateRide = (this.state.car) ? <CreateRide car={this.state.car} driver={this.state.driver} alert={this.updateAlert} /> : '';
    const showAlert = (this.state.alert !== '') ? <h5>{this.state.alert}</h5> : '';
    const rideSignUp = this.state.rides.slice().map((ride, i) => {
      const data = ride.data()
      return (
        <JoinRide 
          isDriver = {data.driver.path === 'users/'+this.props.authUser.uid} 
          toLab = {(data.toLab === 'true')} 
          label = {data.label}
          capacity = {data.capacity}
          key = {'ride'+i}
          ride = {ride.ref}
          user = {this.props.authUser}
        />
      )
    })

    return(
      <article className="booking">
        <p>Hello {this.props.authUser.displayName}</p>
        {showAlert}
        <hr />
        {showCreateRide}
        {/* <JoinRide isDriver={true} toLab={true} />
        <JoinRide isDriver={false} toLab={false} /> */}
        {rideSignUp}
      </article>
    )
  }
}

export default withFirebase(Booking);