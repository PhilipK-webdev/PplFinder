import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import * as S from "./style";
import GoogleMapReact from 'google-map-react'
import Map from 'components/Map';



const CustomModal = ({ open, handleClose, user }) => {
  // console.log('user', user)





  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <S.Background>
        <div>Hi Modal</div>
        <S.Name>{`${user.name.first} ${user.name.last}`}</S.Name>
        {/* <S.Phone></S.Phone>
        <S.Address></S.Address> */}
        <Map />
      </S.Background>
    </Modal>
  );
};

export default CustomModal;