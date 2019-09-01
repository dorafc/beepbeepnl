import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

import Passengers from './Passengers';

class JoinRide extends Component{
  constructor(props) {
		super(props);
    this.state = {
      buttonText :  "",
      availableSeats : 0,
      driver : ''
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateCapacity = this.updateCapacity.bind(this)
  }

  componentDidMount(){
    // get driver
    this.props.driver.get()
    .then( driver => {
      this.setState({
        driver : driver.data().name
      })
    })
    .catch (error => "error getting driver: "+error)

    // update button text depending on if the user is driving
    this.setState({
      // buttonText : (this.props.isDriver) ? 'Update' : 'Join Ride'
      buttonText : 'Join Ride'
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
    const directionText = (this.props.toLab) ? 'Ronk 🚆→⚛️ Lab' : ' Lab ⚛️→🚆Ronk'
    // show driver
    const driver = (this.state.driver) ? <p>Driver: {this.state.driver}</p> : ''
    
    return(
      <div className="joinRide">
        <h3>{rideLabel} ({directionText})</h3>
        <p>Capacity: {this.props.capacity}</p>
        {driver}
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