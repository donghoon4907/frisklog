import React from "react";

import MinimizeChatBar from "./MinimizeChatBar";
import ChatBar from "./ChatBar";

/**
 * 푸터 컴포넌트
 *
 */
const Footer = () => {
    const displayName = "fr-footer";

    return (
        <div className={`${displayName}__wrapper`}>
            <footer className={`${displayName}`}>
                <div className={`${displayName}__column`}></div>
                <div className={`${displayName}__column`}>
                    <MinimizeChatBar />
                </div>
            </footer>
        </div>
    );
};

export default Footer;
