import React, { useCallback } from "react";

import { useSelector, useDispatch } from "../../context";
import { SEARCH_POST } from "../../context/action";

/**
 * 마이페이지 정렬 목록 컴포넌트
 *
 * @param {number}  props.id
 * @param {boolean} props.isLike
 * @param {string}  props.text
 * @param {boolean} props.enable
 *
 */
const MypageOrderItem = ({ id, isLike, text }) => {
    const displayName = "fr-mypage__item";

    const dispatch = useDispatch();

    const { searchPostOption } = useSelector();

    const handleClick = useCallback(() => {
        dispatch({
            type: SEARCH_POST,
            activeId: id,
            isLike
        });
    }, [id, isLike]);

    return (
        <li
            className={`${displayName} ${
                searchPostOption.activeId === id ? `${displayName}--active` : ""
            }`}
            role="button"
            onClick={handleClick}
        >
            <span>{text}</span>
        </li>
    );
};

export default MypageOrderItem;
