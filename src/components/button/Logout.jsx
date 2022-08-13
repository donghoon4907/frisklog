import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";

import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL, LOGOUT_USER } from "../../context/action";
import { UPDATE_USER } from "../../graphql/mutation/user";
import { TOKEN_KEY, getStorage, deleteStorage } from "../../lib/cookie";
import Button from ".";

/**
 * 로그아웃 버튼 컴포넌트
 *
 */
const LogoutBtn = () => {
    const dispatch = useDispatch();

    const [uptStatus, { loading }] = useMutation(UPDATE_USER);
    // 클릭 핸들러
    const handleClick = useCallback(async () => {
        if (loading) {
            return alert("요청 중입니다");
        }
        // 토큰 가져오기
        const token = getStorage(TOKEN_KEY);

        if (token === null) {
            return dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }

        const tf = window.confirm("로그아웃 하시겠어요?");

        if (tf) {
            try {
                await uptStatus({
                    variables: { status: "offline" }
                });
                // 토큰 삭제
                deleteStorage(TOKEN_KEY);
                // 로컬 상태 갱신
                dispatch({
                    type: LOGOUT_USER
                });
            } catch (error) {
                graphqlError({ error, dispatch });
            }
        }
    }, [loading]);

    return (
        <div title="Logout">
            <Button
                type="button"
                className="fr-btn--primary"
                onClick={handleClick}
            >
                <span>로그아웃</span>
            </Button>
        </div>
    );
};

export default LogoutBtn;
