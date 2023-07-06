import { useMemo, useState } from 'react';
import { useJsApiLoader, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import './Map.css';

const Map = ({ incidentData }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAFKD1DD_Pimli8WqbJlOjQ798ghI2Tpc8',
  });

  const center = useMemo(() => ({ lat: 37.541885, lng: -77.440624 }), []);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const onLoad = marker => {
    console.log('marker: ', marker);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="map-container">
      {incidentData.map(incident => (
        <MarkerF
          onLoad={onLoad}
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
            <h3>Incident Description</h3>
            <p></p>
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
