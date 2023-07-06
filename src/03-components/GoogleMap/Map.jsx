import { useMemo, useState, useEffect } from 'react';
import { GoogleMap, MarkerF, InfoWindow, LoadScript } from '@react-google-maps/api';
import { formatDate, formatTime, formatAddress, formatTemp } from '../../04-utilities/usefulFunctions';
import PropTypes from 'prop-types';
import './Map.css';
import weatherService from '../../05-services/weatherService';

const Map = ({ incidentData }) => {

  // ------------------------------------------------------------ Setting Center of Map to Incidents ------------------------------------------------------------ //

  const center = useMemo(() => ({ lat: 37.541885, lng: -77.440624 }), []);

  // ---------------------------------------- Initializing state variables to display information through the InfoWindow ---------------------------------------- //

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  // ---------- This useEffect conducts a forEach loop of incidentData to get the weather data of each incident and assign it to a state variable. -------------- //

  useEffect(() => {
    incidentData.forEach(incident => {
      weatherService.getByDate(incident.address.latitude, incident.address.longitude, formatDate(incident.description.event_opened), formatDate(incident.description.event_closed))
        .then(response => { setWeatherData(prevData => ({ ...prevData, [incident.description.event_id]: response.data.data[0] }))})
        .catch(error => { console.error('Error:', error); })});

    console.log(incidentData);
  }, [incidentData]);

  // ------------------------------ Sets the selectedMarker useState variable to get data from the marker currently being clicked. ------------------------------ //

  const onMarkerClick = marker => {
    setSelectedMarker(marker);
  };

  /* * Explanation of the return below

  1. We are wrapping the GoogleMap in a LoadScript as that defines the API key and helps initialize the map.
  2. The Google Map component renders the map on the page. I wrapped this inside of a div called "wrapper" in case of needing to display information outside of the map.
    a. If time permits, I will style this and add incident data outside of the map. 

  3. Inside of the map we are conditionally rendering the InfoWindow to make sure it's only displayed when a marker is selected.
    a. Inside of the InfoWindow component, we are mapping the incidentData in order to display markers which show the incident and weather data.
    b. Inside of the InfoWindow component, we are adding null checks to all the data we are displaying. 
       If we're not given a value, we display "No Data" to show that.

  */
  return (
    <div className="wrapper">
      <LoadScript googleMapsApiKey="AIzaSyAFKD1DD_Pimli8WqbJlOjQ798ghI2Tpc8">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container">
          {incidentData.map(incident => (
            <MarkerF
              key={incident.description.event_id}
              position={{ lat: incident.address.latitude, lng: incident.address.longitude }}
              onClick={() => onMarkerClick(incident)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.address.latitude, lng: selectedMarker.address.longitude }}
              onCloseClick={() => setSelectedMarker(null)}>
              <div>
                <h2>Marker Coordinates</h2>
                <p>Latitude: {selectedMarker.address.latitude ? selectedMarker.address.latitude : 'No Data'}</p>
                <p>Longitude: {selectedMarker.address.longitude ? selectedMarker.address.longitude : 'No Data'}</p>
                <h3>Incident Details</h3>
                <p>Incident Date: {selectedMarker.description.event_opened ? formatDate(selectedMarker.description.event_opened) : 'No Data'}</p>
                <p>Incident Time: {selectedMarker.description.event_opened ? formatTime(selectedMarker.description.event_opened) : 'No Data'}</p>
                <p>Incident Address: {selectedMarker.address ? formatAddress(selectedMarker.address) : 'No Data'}</p>
                <p>Incident Type: {selectedMarker.description.type ? selectedMarker.description.type : 'No Data'}</p>
                {weatherData[selectedMarker.description.event_id] && (
                  <div>
                    <h4>Weather Data</h4>
                    <p> Temperature:
                      {weatherData[selectedMarker.description.event_id].tavg ? ` ${formatTemp(weatherData[selectedMarker.description.event_id].tavg)}` : 'No Data'}
                    </p>

                    <p> Precipitation:
                      {weatherData[selectedMarker.description.event_id].prcp ? ` ${weatherData[selectedMarker.description.event_id].prcp} (in)` : ' No Data'}</p>

                    <p> Wind Speed:
                      {weatherData[selectedMarker.description.event_id].wspd ? ` ${weatherData[selectedMarker.description.event_id].wspd} (mph)` : 'No Data'}</p>

                    <p> Pressure:
                      {weatherData[selectedMarker.description.event_id].pres ? ` ${weatherData[selectedMarker.description.event_id].pres} (Hg)` : 'No Data'}</p>

                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <div className="details"></div>
    </div>
  );
};

// ------------------------------------------------------- Data validation through the use of PropTypes ------------------------------------------------------- //

Map.propTypes = {
  incidentData: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired,
      }).isRequired,
      description: PropTypes.shape({
        event_id: PropTypes.string.isRequired,
        event_opened: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
export default Map;
