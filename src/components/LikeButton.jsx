import React from "react";

/**
 * 버튼 모양 텍스트 랜더링 컴포넌트
 *
 * @param {string}  props.content 카테고리명
 */
const LikeButton = ({ className, content, children }) => (
    <div className={`fr-btn fr-btn--with ${className}`}>
        <span>{content}</span>
        {children}
    </div>
);

export default LikeButton;
