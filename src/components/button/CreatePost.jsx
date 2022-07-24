import React, { useCallback } from "react";
// import { useHistory } from "react-router-dom";
import { Add } from "../../assets/icon";
import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL, SHOW_POST_MODAL } from "../../context/action";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";

/**
 * 포스트 작성 버튼 컴포넌트
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
        <div className="fr-header__post" title="포스트 작성 버튼">
            <button
                type="button"
                aria-label="포스트 작성"
                onClick={handleClick}
            >
                <Add />
            </button>
        </div>
    );
};

export default CreatePostBtn;
