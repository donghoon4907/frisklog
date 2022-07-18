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
        const token = getStorage(TOKEN_KEY);

        if (!token) {
            // 로그인 모달 보이기
            dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }
    }, []);

    return id ? (
        <div className="d-flex justify-content-start" title="Go mypage">
            <Avatar
                ariaLabel="Go mypage"
                domainUrl="/"
                path={`/user/${id}`}
                storageUrl={process.env.RAZZLE_BACKEND_ROOT}
                src={avatar}
                size={30}
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
