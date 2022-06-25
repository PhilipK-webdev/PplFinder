import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";
import * as S from "./style";
import Text from "components/Text";
import UserFavorite from "components/UserFavorite";
function Favorite() {
    const [usersFavorite, setUsersFavorite, removeUsersFavorite] = useLocalStorage("user", "");
    const [getUser, setGetUsers] = useState();
    useEffect(() => {
        usersFavorite.length > 0 ? setGetUsers([...usersFavorite]) : setGetUsers([])
    }, [])
    return (
        <S.Favorite>
            <S.Content>
                <S.Header>
                    <Text size="64px" bold>
                        PplFavorite
                    </Text>
                </S.Header>
                {usersFavorite.length ? <UserFavorite users={getUser} /> : null}
                {/* <UserList users={users} isLoading={isLoading} /> */}
            </S.Content>
        </S.Favorite>
    );

}

export default Favorite