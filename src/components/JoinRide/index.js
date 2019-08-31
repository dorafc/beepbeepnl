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

    // replace with data stuff
    this.isDriver = this.props.isDriver
    this.toLab = this.props.toLab

    // end replace with data stuff

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
    event.preventDefault();
    this.setState({ ...initialState });
  }

  render() {
    // text for Ride Type
    const rideLabel = (this.isDriver) ? 'Add Riders to RideName' : 'Join RideName'
    const rideDirection = (this.toLab) ? ' to lab.' : ' from lab.'
    const buttonText = (this.isDriver) ? 'Update Rider' : 'Join Ride'

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