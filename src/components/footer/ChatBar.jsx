import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { useDispatch } from "../../context";
import { getStorage, TOKEN_KEY } from "../../lib/cookie";
import { FormInput } from "../Form";
import { useInput } from "../../hooks";

/**
 * 검색 바 컴포넌트
 *
 */
const ChatBar = () => {
    const displayName = "fr-chat";

    const history = useHistory();

    const dispatch = useDispatch();

    const message = useInput("");

    // 검색 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            if (loading) {
                return alert("요청 중입니다");
            }

            const token = getStorage(TOKEN_KEY);

            if (token === null) {
                return dispatch({
                    type: SHOW_LOGIN_MODAL
                });
            }
        },
        [loading, message.value]
    );

    return (
        <div className={`${displayName}__search`}>
            <form onSubmit={handleSubmit}>
                <FormInput
                    placeholder="메세지 보내기"
                    id="chat"
                    autoComplete="off"
                    required
                    isExpand={true}
                    label="메세지"
                    {...message}
                />
            </form>
        </div>
    );
};

export default ChatBar;
