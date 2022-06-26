import React, { useState } from 'react'
import * as S from "./style";
// import InfoIcon from '@material-ui/icons/Info';
import IconButton from "@material-ui/core/IconButton";
import MapIcon from '@material-ui/icons/Map';
import FavoriteIcon from "@material-ui/icons/Favorite";
import Text from "components/Text";
function User({ user, setFavorite, index, showInfoIcon, onInfoClick, lastUserRef }) {
    const [hoveredUserId, setHoveredUserId] = useState();
    const handleMouseEnter = (index) => {
        setHoveredUserId(index);
    };
    const handleMouseLeave = () => {
        setHoveredUserId();
    };

    return (
        <S.User
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            ref={lastUserRef}
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
            <S.IconsContainer>
                <S.IconButtonWrapper isVisible={index === hoveredUserId || user.isFavorite}
                    onClick={() => setFavorite(user)}>
                    <IconButton>
                        <FavoriteIcon color="error" />
                    </IconButton>
                </S.IconButtonWrapper>

                {showInfoIcon ?
                    <S.IconButtonWrapper onClick={() => onInfoClick(user)} isVisible={index === hoveredUserId || user.isFavorite}>
                        <IconButton>
                            <MapIcon />
                        </IconButton>
                    </S.IconButtonWrapper> : null
                }

            </S.IconsContainer>
        </S.User>
    )
}

export default User