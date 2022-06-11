import React, { useState, useCallback, useEffect } from "react";
import { Profile, Logout } from "../assets/icon";
import { useDispatch, useSelector } from "../context";
import { SHOW_LOGIN_MODAL, SET_ME } from "../context/action";
import { TOKEN_KEY, getStorage, deleteStorage } from "../lib/cookie";
import PopoverAvatar from "./PopoverAvatar";

/**
 * 내 정보 아이콘 컴포넌트
 *
 */
const ProfileBtn = () => {
    // Dispatch hooks
    const dispatch = useDispatch();
    // Selector hooks
    const { id, avatar } = useSelector();

    const [isLoggedIn, setIsLoggedIn] = useState(id !== null);
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

    useEffect(() => {
        // 로그인 여부 변경
        setIsLoggedIn(id !== null);
    }, [id]);

    return isLoggedIn ? (
        <div className="d-flex justify-content-start">
            <PopoverAvatar src={avatar} size="30" userId={id} />
            {/* <button
                onClick={handleClick}
                className="d-flex justify-content-start align-items-center"
            >
                <Logout />
                <span className="a11y-hidden">로그아웃</span>
            </button> */}
        </div>
    ) : (
        <button onClick={handleClick}>
            <Profile />
            <span className="a11y-hidden">로그인 하기</span>
        </button>
    );
};

export default ProfileBtn;
