import React, { useEffect, useState, useRef, useCallback } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import * as S from "./style";
import User from "./User";
import Modal from "components/Modal";

const arrayValues = [];
const UserList = ({ users, isLoading, usersFavorites, setUsersFavorites, setPageNumber }) => {
  const [usersState, setUsersState] = useState([]);
  const [userSaveFavorite, setUserSaveFavorite] = useState();
  const [isModalOpen, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [isAlertOn, setIsAlertOn] = useState(false);
  const observer = useRef();
  const lastUserRef = useCallback((node) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !arrayValues.length) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [isLoading])
  const updateFavoriteUsers = () => {
    const favoriteUsers = users.map((user) => {
      user.isFavorite = usersFavorites.some(userFavorite => user.login.uuid === userFavorite.uuid);
      return user;
    });
    setUsersState([...favoriteUsers]);
  }

  useEffect(() => {
    usersFavorites.length ? setUserSaveFavorite([...usersFavorites]) : setUserSaveFavorite([]);
    if (usersFavorites.length) {
      updateFavoriteUsers();
    }
  }, [usersFavorites])

  useEffect(() => {
    setUsersState(users);
  }, [users]);


  const filterUsersByCountry = () => {
    const temp = arrayValues.map((country, indexCountry) => {
      return users.filter((user, index) => {
        if (user.nat === country) {
          return user;
        }
      });
    }).flat();
    if (temp.length) {
      setIsAlertOn(false);
      return setUsersState([...temp])
    } else { setIsAlertOn(true) };
  }

  const setFavorite = (user) => {
    let userArray = userSaveFavorite;
    const indexUserExists = userArray.findIndex(_user => _user.uuid === user.login.uuid);
    if (indexUserExists !== -1) {
      userArray.splice(indexUserExists, 1);
    } else {
      let userObject = {
        name: user.name,
        location: user.location,
        uuid: user.login.uuid,
        isFavorite: true,
        picture: { large: user.picture.large }

      }
      userArray.push(userObject);
    }
    setUserSaveFavorite([...userArray]);
    setUsersFavorites([...userArray]);
  }

  const onChange = useCallback((e) => {
    const { value } = e.target;
    if (!arrayValues.includes(value)) {
      arrayValues.push(value);
    } else {
      const index = arrayValues.indexOf(value);
      arrayValues.splice(index, 1);
      setIsAlertOn(false);
    }

    if (arrayValues.length === 0) {
      setUsersState(users);
      return;
    }

    filterUsersByCountry();
  }, [usersState, arrayValues]);


  const setModal = (user) => {
    setOpenModal(true);
    setModalData(user);
  }
  return (
    <>
      <S.UserList>
        <S.Filters>
          <CheckBox value="BR" label="Brazil" onChange={onChange} />
          <CheckBox value="AU" label="Australia" onChange={onChange} />
          <CheckBox value="CA" label="Canada" onChange={onChange} />
          <CheckBox value="DE" label="Germany" onChange={onChange} />
          <CheckBox value="ES" label="Spain" onChange={onChange} />
        </S.Filters>
        {isAlertOn ? <S.Alert>No Match </S.Alert> : null}
        <S.List >
          {usersState.map((user, index) => {
            if (usersState.length === index + 1) {
              return <User
                index={index}
                key={index}
                user={user}
                setFavorite={setFavorite}
                showInfoIcon={true}
                onInfoClick={setModal}
                lastUserRef={lastUserRef}
              />
            } else {
              return (
                <User
                  index={index}
                  key={index}
                  user={user}
                  setFavorite={setFavorite}
                  showInfoIcon={true}
                  onInfoClick={setModal}
                />
              )
            }

          })}
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        </S.List>
      </S.UserList>
      {isModalOpen ? <Modal user={modalData} open={isModalOpen} handleClose={setOpenModal} /> : null}
    </>
  );
};

export default UserList;
