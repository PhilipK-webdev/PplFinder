import React from "react";
import GoogleMapReact from 'google-map-react'
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { IconButton } from "@material-ui/core";
import * as S from "./style";

const Map = ({ location }) => {
  const _location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 31.0461,
    lng: 34.8516,
  }
  const LocationPin = ({ text }) => (
    <S.LocatoinPin>
      <IconButton>
        <LocationOnIcon />
      </IconButton>
      <p className="pin-text">{text}</p>
    </S.LocatoinPin>
  )

  return (
    <S.Map>
      <S.GoogleMap>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCo2_jPXxs5om2JKLGfb-a41Rtf9_zEQ_A' }}
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
