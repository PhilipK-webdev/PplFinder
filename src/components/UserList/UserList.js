import React, { useEffect, useState, useRef, useCallback } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import * as S from "./style";
import User from "./User";

const arrayValues = [];
const UserList = ({ users, isLoading, usersFavorites, setUsersFavorites }) => {
  const [usersState, setUsersState] = useState([]);
  const [userSaveFavorite, setUserSaveFavorite] = useState();

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
    setUsersState([...temp]);
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
    }

    if (arrayValues.length === 0) {
      setUsersState(users);
      return;
    }

    filterUsersByCountry();
  }, [usersState, arrayValues]);
  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={onChange} />
        <CheckBox value="AU" label="Australia" onChange={onChange} />
        <CheckBox value="CA" label="Canada" onChange={onChange} />
        <CheckBox value="DE" label="Germany" onChange={onChange} />
      </S.Filters>
      <S.List>
        {usersState.map((user, index) => {
          return (
            <User
              index={index}
              key={index}
              user={user}
              setFavorite={setFavorite}
              showInfoIcon={true}
            />
          )
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
