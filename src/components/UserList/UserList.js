import React, { useEffect, useState, useRef, useCallback } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoIcon from '@material-ui/icons/Info';
import * as S from "./style";
import { useLocalStorage } from "hooks/useLocalStorage";
const arrayValues = [];
const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [usersState, setUsersState] = useState([]);
  const [favoriteId, setFavoriteId, removeFavoriteId] = useLocalStorage("user", "");
  const [userSaveFavorite, setUserSaveFavorite] = useState();


  useEffect(() => {
    favoriteId.length ? setUserSaveFavorite([...favoriteId]) : setUserSaveFavorite([]);
  }, [favoriteId])

  useEffect(() => {
    setUsersState(users);
  }, [users]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

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
    user.boolean = !user.boolean;
    let userArray = userSaveFavorite;
    let localstorage = favoriteId;
    const indexUserExists = userArray.map(user => user.uuid).indexOf(user.login.uuid);

    if (indexUserExists !== -1) {
      userArray.splice(indexUserExists, 1);
    } else {
      let userObject = {
        name: user.name,
        location: user.location,
        uuid: user.login.uuid,
        boolean: user.boolean,
        picture: user.picture.large

      }
      userArray.push(userObject);
    }
    setUserSaveFavorite([...userArray]);
    setFavoriteId([...userArray]);
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
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || user.boolean}
                onClick={() => setFavorite(user)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
                {/* <IconButton>
                  <InfoIcon />
                </IconButton> */}
              </S.IconButtonWrapper>
            </S.User>
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
