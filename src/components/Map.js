import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

const Mapchap = withGoogleMap(props =>
	<GoogleMap
		defaultZoom={11}
		center={{ lat: props.lat, lng: props.lng }}
	>
		{props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
	</GoogleMap>
);

Mapchap.propTypes = {
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired,
	isMarkerShown: PropTypes.bool.isRequired,
};

Mapchap.defaultProps = {
	lat: 59.4370,
	lng: 24.7536,
	isMarkerShown: false
};

export default Mapchap;

/* const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} onClick={props.onMarkerClick} />}
  </GoogleMap>
) */

/* const Mapchap = withGoogleMap(props =>

	<GoogleMap
		defaultZoom={12}
		defaultCenter={{ lat: 59.4370, lng: 24.7536 }}
	>
		<Marker position={{ lat: 59.4370, lng: 24.7536 }} />
	</GoogleMap>
);

Mapchap.propTypes = {
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired
};

Mapchap.defaultProps = {
	lat: 59.4370,
	lng: 24.7536
}; */