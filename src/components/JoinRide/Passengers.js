import React, {Component} from 'react';
import { withFirebase } from '../Firebase';

class Passengers extends Component{

  constructor(props) {
		super(props);
    this.state = { 
      passengers : []
    };
  }

  componentDidMount(){
    // get list of passengers in the ride
    if (this.props.ride){
      const passengerRef = this.props.ride.collection('passengers')
      passengerRef.onSnapshot((query) => {
        let passengers = []
        query.docs.forEach((passenger,i) => {
          passengers.push(passenger.data().passenger)
        })
        this.setState({ passengers : passengers})
      })
    }
  }

  render(){
    // generate list of passengers
    const passengerList = this.state.passengers.slice().map((passenger, i) => {
      return(
        <li key={"passenger" + i}>{passenger}</li>
      )
    })
    return(
      <ul className='passengerList'>
        {passengerList}
      </ul>
    )
  }
}

export default withFirebase(Passengers);