import { useMemo, useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import { formatDate, formatTime, formatAddress } from '../../04-utilities/usefulFunctions';
import PropTypes from 'prop-types';
import './Map.css';

const Map = ({ incidentData }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAFKD1DD_Pimli8WqbJlOjQ798ghI2Tpc8',
  });

  useEffect(() => {
    console.log(incidentData);
  }, [incidentData]);

  const center = useMemo(() => ({ lat: 37.541885, lng: -77.440624 }), []);
  const [selectedMarker, setSelectedMarker] = useState(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
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
          onClick={() => setSelectedMarker(incident)}
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
            <p>Incident Date: {formatDate(selectedMarker.description.event_opened)} </p>
            <p>Incident Time: {formatTime(selectedMarker.description.event_opened)}</p>
            <p>Incident Address: {formatAddress(selectedMarker.address)}</p>
            <p>Incident Type: {selectedMarker.description.type}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
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
    })
  ).isRequired,
};

export default Map;
