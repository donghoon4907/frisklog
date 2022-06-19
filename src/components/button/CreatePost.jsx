import React, { useCallback } from "react";
// import { useHistory } from "react-router-dom";
import { Add } from "../../assets/icon";
import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL, SHOW_POST_MODAL } from "../../context/action";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";

/**
 * 헤더 게시물 추가 컴포넌트
 *
 */
const CreatePostBtn = () => {
    // const history = useHistory();

    const dispatch = useDispatch();
    // 클릭 핸들러
    const handleClick = useCallback(() => {
        // 로그인 체크
        const token = getStorage(TOKEN_KEY);

        if (token === null) {
            return dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }

        // history.push("/create_post");
        dispatch({
            type: SHOW_POST_MODAL
        });
    }, []);

    return (
        <button
            className="fr-header__post"
            onClick={handleClick}
            title="포스트 등록"
        >
            <Add />
            <span className="a11y-hidden">포스트 등록</span>
        </button>
    );
};

export default CreatePostBtn;
