import React from "react";
import * as S from "./style";
import User from "../UserList/User"
const UserFavorite = ({ users, setUsersFavorite }) => {
  const setFavorite = (user) => {
    const usersCopyProps = [...users];
    const indexUserExists = users.findIndex(_user => _user.uuid === user.uuid);
    if (indexUserExists !== -1) {
      usersCopyProps.splice(indexUserExists, 1);
      setUsersFavorite([...usersCopyProps]);
    }
  }
  return (
    <S.UserList>
      <S.List>
        {users?.map((user, index) => {
          return (
            <User
              index={index}
              key={index}
              user={user}
              setFavorite={setFavorite}
              showInfoIcon={false}
            />
          );
        })}
      </S.List>
    </S.UserList>
  );
};

export default UserFavorite;
