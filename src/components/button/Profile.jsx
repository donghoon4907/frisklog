import React, { useCallback } from "react";
import { Profile } from "../../assets/icon";
import { useDispatch, useSelector } from "../../context";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";
import LinkImage from "../LinkImage";

/**
 * 내 정보 아이콘 컴포넌트
 *
 */
const ProfileBtn = () => {
    const dispatch = useDispatch();

    const { id, avatar } = useSelector();
    // 클릭 핸들러
    const handleClick = useCallback(() => {
        const token = getStorage(TOKEN_KEY);

        if (!token) {
            // 로그인 모달 보이기
            dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }
    }, []);

    return id ? (
        <div className="fr-header__avatar" title="Mypage">
            <LinkImage
                ariaLabel="Mypage"
                path={`/user/${id}`}
                src={process.env.RAZZLE_BACKEND_ROOT + avatar}
                alt="Avatar"
                isInternal={true}
            />
        </div>
    ) : (
        <div title="Login">
            <button onClick={handleClick} aria-label="Login">
                <Profile />
            </button>
        </div>
    );
};

export default ProfileBtn;
