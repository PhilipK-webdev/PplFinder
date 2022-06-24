import React, { useEffect, useState, useRef, useCallback } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoIcon from '@material-ui/icons/Info';
import * as S from "./style";
import { useLocalStorage } from "hooks/useLocalStorage";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [clickUserId, setClickUserId] = useState(Array(users.length).fill(false));
  const [arrayValues, setArrayValues] = useState([]);
  const [usersState, setUsersState] = useState([]);
  const [uuid, setUuid] = useState([]);
  const [favoriteId, setFavoriteId, removeFavoriteId] = useLocalStorage("uuid", "");

  useEffect(() => {
    console.log(favoriteId);
  }, [favoriteId])
  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const setFavorite = (index, uuidUser) => {
    let arrayUuid = uuid;
    let arrayOfBooleans = clickUserId;
    arrayOfBooleans[index] = !arrayOfBooleans[index];
    if (arrayUuid.includes(uuidUser)) {
      const findUuid = arrayUuid.indexOf(uuidUser);
      arrayUuid.splice(findUuid, 1);
    } else {
      arrayUuid.push(uuidUser);
    }
    setUuid(arrayUuid);
    setFavoriteId([...arrayUuid]);
    setClickUserId([...arrayOfBooleans]);
  }

  const onChange = useCallback((e) => {
    const { value } = e.target;
    let temp = [];
    if (!arrayValues.includes(value)) {
      let arr = [];
      arr.push(value);
      temp = users.filter((user, index) => {
        if (user.nat === value) {
          return user;
        }
      });
      setUsersState([...usersState, ...temp]);
      setArrayValues([...arrayValues, ...arr]);
    } else {
      let spliceArr = arrayValues;
      const index = spliceArr.indexOf(value);
      spliceArr.splice(index, 1);
      spliceArr.forEach((val, indexVal) => {
        users.forEach((user, indexUser) => {
          if (val === user.nat) {
            temp.push(user);
          }
        });
      })
      setArrayValues([...spliceArr]);
      setUsersState([...temp]);
    }
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
        {usersState.length === 0 ? users.map((user, index) => {
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId || clickUserId[index]}
                onClick={() => setFavorite(index, user.login.uuid)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        }) : usersState.map((user, index) => {
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId || clickUserId[index]}
                onClick={() => setFavorite(index)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
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
