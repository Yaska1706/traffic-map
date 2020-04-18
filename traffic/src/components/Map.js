import React from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            viewport:{
                width:1000 ,
                height:500 ,
                latitude: 53.5461,
                longitude: -113.4938,
                zoom: 10
            },
            token: '',
        }
    }
    render(){
        return(
            <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}
          />

        );
    }

}

export default Map;