import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

const initialState = {
  direction : 'true',
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
    const ridesRef = this.props.firebase.db.collection('rides');

    ridesRef.doc().set({
      carName : this.props.car.name,
      capacity : this.props.car.capacity,
      driver : this.props.driver, 
      label : this.state.rideId,
      toLab : this.state.direction,
      timestamp : this.props.firebase.getTimestamp()
    })

    // reset component state
    this.setState({ ...initialState });
  }

  render() {
    return(
      <div className="setRide">
        <h3>Create a ride in {this.props.car.name}</h3>
        <p>Capacity: {this.props.car.capacity} nerds</p>

        <form onSubmit={this.onSubmit}>
          {/* LAB DIRECTION - convert strings to boolean at db write */}
          <div className="direction">
            <input  type="radio" 
                    id="toLab" 
                    value='true'
                    name="direction" 
                    checked={this.state.direction === 'true'} 
                    onChange={this.onChange} 
            />
            <label htmlFor="toLab"> Towards Lab </label>
          </div>
          <div className="direction">
            <input  type="radio" 
                    id="fromLab" 
                    value='false'
                    name="direction" 
                    checked={this.state.direction === 'false'} 
                    onChange={this.onChange} 
            />
            <label htmlFor="fromLab"> From Lab </label>
          </div><br />

          {/* WHICH TRAIN */}
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