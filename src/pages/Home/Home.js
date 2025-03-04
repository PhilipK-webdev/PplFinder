import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
const Home = ({ users,
  isLoading,
  usersFavorites,
  setUsersFavorites,
  setPageNumber }) => {
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          usersFavorites={usersFavorites}
          setUsersFavorites={setUsersFavorites}
          setPageNumber={setPageNumber}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
