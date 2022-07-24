import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Favorite } from "../../assets/icon";
import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";

/**
 * 팔로잉 버튼 컴포넌트
 *
 */
const FavoriteBtn = () => {
    const history = useHistory();

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

        history.push("/follow");
    }, []);

    return (
        <div title="팔로잉 버튼">
            <button type="button" aria-label="팔로잉" onClick={handleClick}>
                <Favorite />
            </button>
        </div>
    );
};

export default FavoriteBtn;
