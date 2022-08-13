import React from "react";

import { Close } from "../../assets/icon";

/**
 * 최소화된 채팅바 컴포넌트
 *
 */
const MinimizeChatBar = () => {
    const displayName = "fr-chat";

    return (
        <div className={`${displayName}__wrapper`}>
            <div className={displayName}>
                <div className={`${displayName}__user`}>
                    <span>Master</span>
                </div>
                <div className={`${displayName}__close`}>
                    <button type="button" aria-label="삭제">
                        <Close
                            style={{
                                width: 10,
                                height: 10
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MinimizeChatBar;
