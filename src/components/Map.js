import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

const MapComponent = withGoogleMap(props =>
	<GoogleMap
		defaultZoom={12}
		center={{ lat: props.lat, lng: props.lng }}
	>
		{props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
	</GoogleMap>
);

MapComponent.propTypes = {
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired,
	isMarkerShown: PropTypes.bool.isRequired,
};

MapComponent.defaultProps = {
	lat: 59.4370,
	lng: 24.7536,
	isMarkerShown: false
};

export default MapComponent;