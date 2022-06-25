import React, { useEffect, useState, useRef, useCallback } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfoIcon from '@material-ui/icons/Info';
import * as S from "./style";
import { useLocalStorage } from "hooks/useLocalStorage";

const UserList = ({ users }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  // const [arrayValues, setArrayValues] = useState([]);
  // const [usersState, setUsersState] = useState([]);
  // const [favoriteId, setFavoriteId, removeFavoriteId] = useLocalStorage("user", "");
  // const [userSaveFavorite, setUserSaveFavorite] = useState([]);

  useEffect(() => {
    console.log(users);
  }, [])


  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const setFavorite = (user) => {
    // user.boolean = !user.boolean;
    // let userArray = userSaveFavorite;
    // const indexUserExists = userArray.map(user => user.uuid).indexOf(user.login.uuid);
    // if (indexUserExists !== -1) {
    //   userArray.splice(indexUserExists, 1);
    // } else {
    //   let userObject = {
    //     name: user.name,
    //     location: user.location,
    //     uuid: user.login.uuid,
    //     boolean: user.boolean
    //   }
    //   userArray.push(userObject);
    // }
    // setUserSaveFavorite([...userArray]);
    // setFavoriteId(userArray);
  }

  return (
    <S.UserList>
      <S.List>
        {users?.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user.picture} alt="" />
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
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
