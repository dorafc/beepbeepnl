import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

import Passengers from './Passengers';

class JoinRide extends Component{
  constructor(props) {
		super(props);
    this.state = {
      buttonText :  "",
      availableSeats : 0
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateCapacity = this.updateCapacity.bind(this)
  }

  componentDidMount(){
    // update button text depending on if the user is driving
    this.setState({
      buttonText : (this.props.isDriver) ? 'Update' : 'Join Ride'
    })
  }

  onChange(event){
  	const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
  	this.setState({
  		[event.target.name] : value,
    })
  }

  onSubmit(event){
    // prevent default button behaviour
    event.preventDefault();

    // add rider to ride in DB
    const rideRef = this.props.ride
    
    rideRef.collection('passengers').get()
    .then(() => {
      if (this.state.availableSeats > 0){
        rideRef.collection('passengers').doc().set({ 
          passenger : this.props.user.displayName,
          user : 'users/' + this.props.user.uid
        })
        .then(()=> {
          this.props.updateAlert("You've been added to " + this.props.label)
        })
        .catch(error => 'Issue adding passenger: ' + error)
      } else {
        this.props.updateAlert("There are too many people already on this ride")
      }
    })
    .catch(error => 'Issue getting current capacity: ' + error)
  }

  updateCapacity(availableSeats){
    this.setState({
      availableSeats : availableSeats
    })
  }

  render() {
    const showSubmit = (this.state.availableSeats) ? <button className="submitRide" type="submit">{this.state.buttonText}</button> : ''
    // text for Ride Type
    const rideLabel = (this.props.isDriver) ? 'Add passengers to ' + this.props.label : 'Join ' + this.props.label
    // text for ride direction
    const rideDirection = (this.props.toLab) ? ' to lab.' : ' from lab.'
    
    return(
      <div className="joinRide">
        <h3>{rideLabel+rideDirection}</h3>
        <p>Capacity: {this.props.capacity}</p>
        <Passengers 
          ride={this.props.ride} 
          updateCapacity={this.updateCapacity}
          capacity={this.props.capacity}
        />
        <form onSubmit={this.onSubmit}>
          {showSubmit}
        </form>
        <hr />
      </div>
    )
  }
}

export default withFirebase(JoinRide);