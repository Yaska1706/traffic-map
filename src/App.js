import React from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from './components/Header';
import Map from './components/Map';
import {Container} from 'reactstrap';
require('dotenv').config()

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      applicationName: "TrafficMap"
    }
  }
  
  render(){
  return (
    <div className="App">
      <Header appName={this.state.applicationName}/>
      <Container>
      <Map/>
      </Container>
      
    </div>
  );
  }
}

export default App;
