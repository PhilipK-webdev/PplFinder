import React from "react";
import GoogleMapReact from 'google-map-react'
import PinDropIcon from '@material-ui/icons/PinDrop';
import Icon from '@material-ui/core/Icon';
import * as S from "./style";

const Map = ({ location }) => {
  const { street: { number, name }, country, state, city } = location;
  const _location = {
    address: `${number} ${name},${city},${state},${country}`,
    lat: Number(location.coordinates.latitude),
    lng: Number(location.coordinates.longitude),
  }
  const LocationPin = ({ text }) => (
    <S.LocatoinPin>
      <Icon fontSize="large">
        <PinDropIcon fontSize="large" />
      </Icon>
      <S.Address>{text.slice(0, 14)} {text.slice(14, text.length)}</S.Address>
    </S.LocatoinPin>
  )
  return (
    <S.Map>
      <S.GoogleMap>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
          defaultCenter={_location}
          defaultZoom={8}
        >
          <LocationPin
            lat={_location.lat}
            lng={_location.lng}
            text={_location.address}
          />
        </GoogleMapReact>
      </S.GoogleMap>
    </S.Map>
  );
};

export default Map;
