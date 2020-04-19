import React from 'react';
import ReactMapGL,{Marker} from 'react-map-gl';
import Pin from './Pin';

class Map extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            viewport:{
                width:1000 ,
                height:500 ,
                latitude: 53.5461,
                longitude: -113.4938,
                zoom: 11
            },
            token: '',
            cords: [
                { latitude: 53.5225, longitude: -113.6242},
                { latitude: 53.5437, longitude: -113.4947},
                { latitude: 53.5439, longitude: -113.4914}
                
            ]
        }
    }
    render(){
        const { cords } = this.state;
        return(
            <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}>
            {cords.map( cord => (
                <Marker latitude ={cord.latitude} longitude={cord.longitude}>
                <Pin/>
                </Marker>
            ))}
            
          </ReactMapGL>
        );
    }

}

export default Map;