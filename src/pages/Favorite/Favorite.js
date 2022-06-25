import React, { useEffect, useState, useRef, useCallback } from "react";
import * as S from "./style";
import Text from "components/Text";
import UserFavorite from "components/UserFavorite";
function Favorite({ usersFavorites, setUsersFavorites }) {

    // useEffect(() => {
    //     // usersFavorite.length > 0 ? setGetUsers([...usersFavorite]) : setGetUsers([])
    // }, [])
    return (
        <S.Favorite>
            <S.Content>
                <S.Header>
                    <Text size="64px" bold>
                        PplFavorite
                    </Text>
                </S.Header>
                {usersFavorites.length ? <UserFavorite users={usersFavorites} setUsersFavorite={setUsersFavorites} /> : null}
            </S.Content>
        </S.Favorite>
    );

}

export default Favorite