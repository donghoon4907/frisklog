import React, { useCallback } from "react";
import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL, SET_ME } from "../../context/action";
import { TOKEN_KEY, getStorage, deleteStorage } from "../../lib/cookie";
import Button from ".";

/**
 * 로그아웃 버튼 컴포넌트
 *
 */
const LogoutBtn = () => {
    // Dispatch hooks
    const dispatch = useDispatch();
    // 클릭 핸들러
    const handleClick = useCallback(() => {
        // 토큰 가져오기
        const token = getStorage(TOKEN_KEY);

        if (token) {
            const tf = window.confirm("로그아웃 하시겠어요?");

            if (tf) {
                // 토큰 삭제
                deleteStorage(TOKEN_KEY);
                // 로컬 상태 갱신
                dispatch({
                    type: SET_ME,
                    id: null,
                    nickname: null,
                    email: null,
                    avatar: null,
                    isMaster: false
                });
            }
        } else {
            // 로그인 모달 보이기
            dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }
    }, []);

    return (
        <Button onClick={handleClick}>
            <span>로그아웃</span>
        </Button>
    );
};

export default LogoutBtn;
