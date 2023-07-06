import { useMemo, useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import { formatDate, formatTime, formatAddress, formatTemp } from '../../04-utilities/usefulFunctions';
import PropTypes from 'prop-types';
import './Map.css';
import weatherService from '../../05-services/weatherService';

const Map = ({ incidentData }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAFKD1DD_Pimli8WqbJlOjQ798ghI2Tpc8',
  });

  const center = useMemo(() => ({ lat: 37.541885, lng: -77.440624 }), []);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    console.log(incidentData);
  }, [incidentData]);

  useEffect(() => {
    incidentData.forEach(incident => {
      weatherService
        .getByDate(incident.address.latitude, incident.address.longitude, formatDate(incident.description.event_opened), formatDate(incident.description.event_closed))
        .then(response => {
          setWeatherData(prevData => ({
            ...prevData,
            [incident.description.event_id]: response.data.data[0],
          }));
          console.log(response);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  }, [incidentData]);

  const onMarkerClick = marker => {
    setSelectedMarker(marker);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="wrapper">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container">
        {incidentData.map(incident => (
          <MarkerF
            key={incident.description.event_id}
            position={{
              lat: incident.address.latitude,
              lng: incident.address.longitude,
            }}
            onClick={() => onMarkerClick(incident)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.address.latitude,
              lng: selectedMarker.address.longitude,
            }}
            onCloseClick={() => setSelectedMarker(null)}>
            <div>
              <h2>Marker Coordinates</h2>
              <p>Latitude: {selectedMarker.address.latitude}</p>
              <p>Longitude: {selectedMarker.address.longitude}</p>
              <h3>Incident Details</h3>
              <p>Incident Date: {formatDate(selectedMarker.description.event_opened)}</p>
              <p>Incident Time: {formatTime(selectedMarker.description.event_opened)}</p>
              <p>Incident Address: {formatAddress(selectedMarker.address)}</p>
              <p>Incident Type: {selectedMarker.description.type}</p>
              {weatherData[selectedMarker.description.event_id] && (
                <div>
                  <h4>Weather Data</h4>
                  <p>Temperature: {formatTemp(weatherData[selectedMarker.description.event_id].tavg)}</p>
                  <p>Precipitation: {`${weatherData[selectedMarker.description.event_id].prcp} (in)`}</p>
                  <p>Wind Speed: {`${weatherData[selectedMarker.description.event_id].wspd} (mph)`}</p>
                  <p>Pressure: {`${weatherData[selectedMarker.description.event_id].pres} (Hg)`}</p>
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div className="details"></div>
    </div>
  );
};

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
        event_opened: PropTypes.instanceOf(Date).isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
export default Map;
