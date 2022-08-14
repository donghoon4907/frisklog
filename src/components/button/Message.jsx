import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { BsChatText } from "react-icons/bs";

import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";

/**
 * 팔로잉 버튼 컴포넌트
 *
 */
const MessageBtn = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
        const token = getStorage(TOKEN_KEY);

        if (token === null) {
            return dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }

        history.push("/message?page=sent&user=to");
    }, []);

    return (
        <div title="메세지 버튼">
            <button type="button" aria-label="메세지" onClick={handleClick}>
                <BsChatText size={24} />
            </button>
        </div>
    );
};

export default MessageBtn;
