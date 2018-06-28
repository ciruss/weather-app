import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap((lat, lng) => {
	<GoogleMap
		defaultZoom={8}
		defaultCenter={{ lat: {lat}, lng: {lng} }}
	>
		<Marker
			position={{ lat: {lat}, lng: {lng} }}
		/>
	</GoogleMap>;
});

<Map
	containerElement={<div style={{ height: '400px' }} />}
	mapElement={<div style={{ height: '100%' }} />}
/>;

export default Map;