import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

const initialState = {
  toLab : false,
  rideId : ''
}

class JoinRide extends Component{
  constructor(props) {
		super(props);
    this.state = { ...initialState };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
    let numCurrentPassengers;
    
    rideRef.collection('passengers').get()
    .then(passengers => {
      numCurrentPassengers = passengers.docs.length
    })
    .then(() => {
      if (numCurrentPassengers < this.props.capacity || !numCurrentPassengers){
        rideRef.collection('passengers').doc().set({ 
          passenger : this.props.user.displayName 
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
     
    // clear state
    this.setState({ ...initialState });
  }

  render() {
    // text for Ride Type
    const rideLabel = (this.props.isDriver) ? 'Add passengers to ' + this.props.label : 'Join ' + this.props.label
    const rideDirection = (this.props.toLab) ? ' to lab.' : ' from lab.'
    const buttonText = (this.props.isDriver) ? 'Update' : 'Join Ride'

    return(
      <div className="joinRide">
        <h3>{rideLabel+rideDirection}</h3>
        <form onSubmit={this.onSubmit}>
          
          <button className="submitRide" type="submit">{buttonText}</button>
        </form>
        <hr />
      </div>
    )
  }
}

export default withFirebase(JoinRide);