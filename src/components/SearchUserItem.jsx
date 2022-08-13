import React, { useCallback } from "react";

/**
 * 팔로잉 유저 컴포넌트
 *
 * @param {ID}       props.id       사용자 ID
 * @param {string}   props.nickname 사용자 별명
 * @param {function} props.callback
 */
const SearchUserItem = ({ id, nickname, callback }) => {
    const handleClick = useCallback(() => callback({ id, nickname }), [id]);

    return <li onClick={handleClick}>{nickname}</li>;
};

export default SearchUserItem;
