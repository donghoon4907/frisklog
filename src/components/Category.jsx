import React, { memo } from "react";

/**
 * 카테고리 랜더링 컴포넌트
 *
 * @param {string}  props.content 카테고리명
 */
const Category = ({ content, children }) => {
    const displayName = "fr-category";

    return (
        <li className={`${displayName}__wrapper`}>
            <div className={`${displayName} ${displayName}--multiple`}>
                <span>{content}</span>
                {children}
            </div>
        </li>
    );
};

export default memo(Category);
