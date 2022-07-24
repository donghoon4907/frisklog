import React, { useCallback, memo } from "react";

import { useSelector, useDispatch } from "../../context";
import { SEARCH_POST } from "../../context/action";

/**
 * 마이페이지 정렬 목록 컴포넌트
 *
 * @param {number}  props.id
 * @param {boolean} props.isLike
 * @param {boolean} props.isFollowing
 * @param {string}  props.text
 * @param {boolean} props.enable
 *
 */
const MypageOrderItem = ({ id, isLike, isFollowing, title }) => {
    const displayName = "fr-mypage__item";

    const dispatch = useDispatch();

    const { searchPostOption } = useSelector();

    const handleClick = useCallback(() => {
        dispatch({
            type: SEARCH_POST,
            activeId: id,
            title,
            isLike,
            isFollowing
        });
    }, [id, title, isLike, isFollowing]);

    return (
        <li
            className={`${displayName} ${
                searchPostOption.activeId === id ? `${displayName}--active` : ""
            }`}
        >
            <button type="button" onClick={handleClick}>
                {title} 보기
            </button>
        </li>
    );
};

export default memo(MypageOrderItem);
