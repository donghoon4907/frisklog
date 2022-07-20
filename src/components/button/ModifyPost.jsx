import React, { useCallback, memo } from "react";
import { Modify } from "../../assets/icon";
import { useDispatch } from "../../context";
import { SHOW_POST_MODAL } from "../../context/action";

/**
 * 수정 버튼 컴포넌트
 *
 * @param {string}   props.postId     게시물 ID
 * @param {object[]} props.content    좋아요 누른 명단
 * @param {object[]} props.categories 게시물 카테고리
 */
const ModifyPostBtn = ({ postId, content, categories }) => {
    const dispatch = useDispatch();
    // 클릭 핸들러
    const handleClick = useCallback(() => {
        // 게시물 수정 모달 열기
        dispatch({
            type: SHOW_POST_MODAL,
            id: postId,
            content,
            categories: categories.map(({ content }) => content)
        });
    }, [postId, content, categories]);

    return (
        <div className="fr-modify" title="포스트 수정 버튼">
            <button
                type="button"
                onClick={handleClick}
                aria-label="포스트 수정"
            >
                <Modify />
            </button>
        </div>
    );
};

export default memo(ModifyPostBtn);
