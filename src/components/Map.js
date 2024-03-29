import React from 'react';
import mapboxgl from 'mapbox-gl';


class Map extends React.Component{
    constructor(props){
        super(props);
        
        
        this.state = {
            app_url:'https://data.edmonton.ca/resource/87ck-293k.json',
            map: false,
            viewport:{
                zoom: 10,
                center: [-113.4938, 53.5461,]
            },
    
            data: false,
        };
    }
    initializeMap(){
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v9',
            ...this.state.viewport

        });
        map.on('load', () => {
            
            map.addLayer({
              "id": "points",
              "type": "circle",
              "source": {
                "type": "geojson",
                "data": this.state.data
              },
              "points": {
                "circle-radius": 12,
                "circle-color": "#B4D455"
              }
            })
          });

        map.on('click', 'points',(e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const {description, details ,impact, duration} = e.features[0].properties;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180){
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`
                    <strong>${description}</strong><br />
                    <em>${impact}</em><br />
                    <em>${duration}</em><br />
                    <p>${details}</p>
                `)
                .addTo(map);
        });

        map.on('mouseenter', 'points', () =>{
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'points', () =>{
            map.getCanvas().style.cursor = '';
        });
        
        this.setState({map});
    }
    geoFeature(data){
        let features = [];
        data.forEach(point => 
            {
                features.push({
                    "type": "feature",
                    "geometry":{
                        "type":"point",
                        "coordinates":[
                            parseFloat(point.location.longitude),
                            parseFloat(point.location.latitude)
                        ]
                    },
                    "properties":{
                        "description": point.description,
                        "details" : point.details,
                        "duration": point.duration,
                        "impact": point.impact
                    }
                });
            });
        return{
            "type": "Feature",
            "features" : features
        }

    }
    componentDidMount(){
        const {data, app_url} = this.state;
        
        if(!data){
            fetch(app_url, {method:'GET'})
            .then(response => response.json())
            .then(response => this.geoFeature(response))
            .then(response => this.setState({data: response}));
        }

    }
    render(){
        const { map, data } = this.state;
        if(data && !map) this.initializeMap();
        return(
           <div style={{width: 1000,height: 500}} id='map'/>
        );
    }

}

export default Map;