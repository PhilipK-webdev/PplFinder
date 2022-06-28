import React from "react";
import * as S from "./style";
import Text from "components/Text";
import UserFavorite from "components/UserFavorite";
function Favorite({ usersFavorites, setUsersFavorites }) {
    return (
        <S.Favorite>
            <S.Content>
                <S.Header>
                    <Text size="64px" bold>
                        PplFavorite
                    </Text>
                </S.Header>
                {usersFavorites.length ?
                    <UserFavorite users={usersFavorites}
                        setUsersFavorite={setUsersFavorites} />
                    : null}
            </S.Content>
        </S.Favorite>
    );

}

export default Favorite