import React from 'react';
import Button from 'components/Button';
import Modal from '@material-ui/core/Modal';
import * as S from "./style";
import Avatar from '@material-ui/core/Avatar';
import Map from 'components/Map';
import Text from "components/Text";
const CustomModal = ({ open, handleClose, user }) => {
  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <S.Background>
        <S.Card>
          <S.CardHeader>
            <Text size="22px" bold>Additional Information</Text>
            <Avatar alt={user.name.first} src={user.picture.medium} />
            <S.Button onClick={() => handleClose(false)}>Go Back</S.Button>
          </S.CardHeader>
          <S.CardBody>
            <S.ImageName>
              <Text size="16px">{`Name: ${user.name.title} ${user.name.first} ${user.name.last}`}
              </Text>
            </S.ImageName>
            <Text size="16px">{`Email: ${user.email}`}</Text>
            <Text size="16px">{`Phone: ${user.phone}`}</Text>
            <Text size="16px">{`Cell: ${user.cell}`}</Text>
            <Text size="16px">{`Nat: ${user.nat}`}</Text>
          </S.CardBody>
        </S.Card>
        <Map location={user.location} />
      </S.Background>
    </Modal>
  );
};

export default CustomModal;