import React, { useCallback } from "react";
import { useDispatch } from "../../context";
import { SHOW_POST_MODAL, HIDE_POST_DROPDOWN } from "../../context/action";

/**
 * 포스트 수정 버튼 컴포넌트
 *
 * @param {string} props.id       POST ID
 * @param {string} props.content  내용
 * @param {string} props.category 카테고리
 */
const UpdatePostBtn = ({ id, content, category }) => {
    const dispatch = useDispatch();

    // 클릭 핸들러
    const handleClick = useCallback(() => {
        // 게시물 수정 모달 열기
        dispatch({
            type: SHOW_POST_MODAL,
            id,
            content,
            category
        });
        // 드롭다운 닫기
        dispatch({
            type: HIDE_POST_DROPDOWN
        });
    }, []);

    return (
        <button className="fr-dropdown__button" onClick={handleClick}>
            <span>수정</span>
        </button>
    );
};

export default UpdatePostBtn;
