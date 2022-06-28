import React, { useEffect, useState, useRef, useCallback } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import * as S from "./style";
import User from "./User";
import Modal from "components/Modal";

const arrayValues = [];
const UserList = ({
  users,
  isLoading,
  usersFavorites,
  setUsersFavorites,
  setPageNumber }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [addUserToFavorite, setAddUserToFavorite] = useState();
  const [isModalOpen, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [isAlertOn, setIsAlertOn] = useState(false);

  // infinity scroll
  const observer = useRef();
  const lastUserRef = useCallback((node) => {
    let options = {
      root: null,
      threshold: 0.5,
    }
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !arrayValues.length) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    }, options)
    if (node) observer.current.observe(node);
  }, [isLoading]);


  const updateFavoriteUsers = () => {
    const favoriteUsers = users.map((user) => {
      user.isFavorite = usersFavorites.some(userFavorite => user.login.uuid === userFavorite.uuid);
      return user;
    });
    setAllUsers([...favoriteUsers]);
  }

  useEffect(() => {
    usersFavorites.length ? setAddUserToFavorite([...usersFavorites])
      : setAddUserToFavorite([]);
    if (usersFavorites.length) {
      updateFavoriteUsers();
    }
  }, [usersFavorites])

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const filterUsersByCountry = (value) => {
    const arrayValuesCopy = arrayValues.map((country, indexCountry) => {
      return users.filter((user, index) => {
        if (user.nat === country) {
          return user;
        }
      });
    }).flat();
    // if (!temporaryArray.length && arrayValues.length) {
    //   setIsAlertOn(true);
    // } else {
    //   setIsAlertOn(false);
    // }
    setAllUsers([...arrayValuesCopy]);
  }

  const setFavorite = (user) => {
    let addUserToFavoriteCopy = addUserToFavorite;
    const indexUserExists = addUserToFavoriteCopy.findIndex(_user => _user.uuid === user.login.uuid);
    if (indexUserExists !== -1) {
      addUserToFavoriteCopy.splice(indexUserExists, 1);
    } else {
      let userObject = {
        name: user.name,
        location: user.location,
        uuid: user.login.uuid,
        isFavorite: true,
        picture: { large: user.picture.large }

      }
      addUserToFavoriteCopy.push(userObject);
    }
    setAddUserToFavorite([...addUserToFavoriteCopy]);
    setUsersFavorites([...addUserToFavoriteCopy]);
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
      setAllUsers(users);
      return;
    }

    filterUsersByCountry(value);
  }, [allUsers, arrayValues]);


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
        {allUsers.length === 0 && arrayValues.length > 0
          ? <S.Alert>No Match </S.Alert>
          : null
        }
        <S.List >
          {allUsers.map((user, index) => {
            if (allUsers.length === index + 1) {
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
