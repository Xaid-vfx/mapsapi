import React from 'react'
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsService } from '@react-google-maps/api'
import Map from './Components/Map'
import { useRef } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'

function App() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ['places']
  })

  const [direction, setdirection] = useState()
  const [distance, setdistance] = useState('')
  const [duration, setduration] = useState('')
  const [show, setshow] = useState(0)

  const [visible, setvisible] = useState(0)

  const origin = useRef('');
  const destination = useRef('');

  async function calcroute() {

    if (origin.current.value === '' || destination.current.value === '')
      return


    try {
      const directionsService = new window.google.maps.DirectionsService()

      const results = await directionsService.route(
        {
          origin: origin.current.value,
          destination: destination.current.value,
          travelMode: window.google.maps.TravelMode.DRIVING
        }

      );

      setdirection(results)
      setdistance(results.routes[0].legs[0].distance.text)
      setduration(results.routes[0].legs[0].duration.text)
      setvisible(0)
    }
    catch (error) {
      setvisible(1)
    }

  }


  return isLoaded ? (
    <div>
      <div className='navbar'>
        <div className='title'> MeterRoutes</div>
      </div>
      <div className='Bigcontainer'>
        <p id="para">Let's calculate <strong>distance</strong> from Google Maps</p>
        <div className='Components'>
          <div className='inputs'>

            <div className='container'>

              <div className='inputboxes'>

                <div>
                  <p className='inputtext'>Source</p>
                  <FontAwesomeIcon className='icon' icon={faLocationPin} />
                  <Autocomplete>
                    <input type='text' ref={origin} className='inputbox' id={visible ? 'red' : ''} />
                  </Autocomplete>
                  <p id={visible ? 'redpara' : 'redparahide'}><small>Please enter correctly</small></p>

                </div>
                <br />
                <div >
                  <p className='inputtext'>Destination</p>
                  <FontAwesomeIcon className='icon' icon={faLocationPin} />
                  <Autocomplete>
                    <input type='text' ref={destination} className='inputbox' id={visible ? 'red' : ''} />
                  </Autocomplete>
                </div>

              </div>
              <button className='calcbtn' onClick={() => { setshow(1); calcroute(); }}>Calculate</button>
            </div>

            <div className='distance'><p className='distancetext'>Distance</p><strong>{distance}</strong></div>
            <div className='distance'><p className='distancetext'>ETA</p><strong>{duration}</strong></div>
            <p><small>The distance and ETA between {origin.current.value ? origin.current.value : " - "} and {destination.current.value ? destination.current.value : " - "} is {distance ? distance : " - "} and {duration ? duration : " - "} respectively.</small> </p>
          </div>


          <div className='map'>
            <Map isLoaded={isLoaded} direction={direction} show={show} />
          </div>
        </div>
      </div>

    </div>
  )
    : <></>
}

export default App
