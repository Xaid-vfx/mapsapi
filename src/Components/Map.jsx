

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsService,DirectionsRenderer} from '@react-google-maps/api';

const containerStyle = {
    width: '500px',
    height: '500px'
};

const containerStyle2 = {
    width: '250px',
    height: '250px'
};

const center = {
    lat: 20.5937,
    lng: 78.9629
};

function MyComponent(props) {


    const [map, setMap] = React.useState(null)


    return props.isLoaded ? (
        <GoogleMap
            mapContainerStyle={window.innerWidth>1100?containerStyle:containerStyle2}
            center={center}
            zoom={4.5}
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            }}
            onLoad={(map) => setMap(map)}
        >
            
            
            {props.show && <DirectionsRenderer directions={props.direction}/>}
            
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)