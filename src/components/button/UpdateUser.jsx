import React, { useCallback } from "react";
import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL, SHOW_USER_MODAL } from "../../context/action";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";
import Button from ".";

/**
 * 내 정보 수정 버튼 컴포넌트
 *
 */
const UpdateUserBtn = () => {
    const dispatch = useDispatch();
    // 클릭 핸들러
    const handleClick = useCallback(() => {
        // 토큰 가져오기
        const token = getStorage(TOKEN_KEY);

        if (token) {
            // 내 정보 수정 모달 보이기
            dispatch({
                type: SHOW_USER_MODAL
            });
        } else {
            // 로그인 모달 보이기
            dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }
    }, []);

    return (
        <Button onClick={handleClick} className="fr-btn--info">
            <span>내 정보 수정</span>
        </Button>
    );
};

export default UpdateUserBtn;
