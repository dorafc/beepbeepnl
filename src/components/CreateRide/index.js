import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

const initialState = {
  toLab : false,
  rideId : ''
}

class CreateRide extends Component{
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
    event.preventDefault();

    // write data
    // const db = this.props.firebase.db;
    // db.collection('rides').doc

    // reset component state
    this.setState({ ...initialState });
  }

  render() {
    return(
      <div className="setRide">
        <h3>Create a ride in {this.props.car.name}</h3>
        <p>Capacity: {this.props.car.capacity} nerds</p>
        <form onSubmit={this.onSubmit}>
          <p>To Lab? Y/N</p>
          <div className="toLab">
            <input type="checkbox" id="toLab" name="toLab" checked={this.state.toLab} onChange={this.onChange} />
            <label htmlFor="toLab" />
            <div className="toggle"></div>
          </div>
          <div className="ride">
            <label htmlFor="rideID">Which train: </label>
            <input type="text" id="rideId" name="rideId" onChange={this.onChange} value={this.state.rideId} />
          </div>
          <button className="submitRide" type="submit">Add Ride</button>
        </form>
        <hr />
      </div>
    )
  }
}

export default withFirebase(CreateRide);