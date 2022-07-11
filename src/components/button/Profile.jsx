import React, { useCallback } from "react";
import { Profile } from "../../assets/icon";
import { useDispatch, useSelector } from "../../context";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";
import Avatar from "../Avatar";

/**
 * 내 정보 아이콘 컴포넌트
 *
 */
const ProfileBtn = () => {
    const dispatch = useDispatch();

    const { id, avatar } = useSelector();
    // 클릭 핸들러
    const handleClick = useCallback(() => {
        // 토큰 가져오기
        const token = getStorage(TOKEN_KEY);

        if (!token) {
            // 로그인 모달 보이기
            dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }
    }, []);

    return id ? (
        <div className="d-flex justify-content-start">
            <Avatar src={avatar} size={30} userId={id} />
        </div>
    ) : (
        <button onClick={handleClick}>
            <Profile />
            <span className="a11y-hidden">로그인 하기</span>
        </button>
    );
};

export default ProfileBtn;
