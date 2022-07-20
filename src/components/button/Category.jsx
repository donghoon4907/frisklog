import React, { memo } from "react";
import { NavLink } from "react-router-dom";

/**
 * 카테고리 버튼 랜더링 컴포넌트
 *
 * @param {string}  props.content 카테고리명
 * @param {string}  props.count   카테고리가 사용된 수
 * @param {boolean} props.isGap   간격 사용 여부
 */
const CategoryBtn = ({ content, count, isGap }) => {
    const displayName = "fr-category";

    return (
        <li className={`${displayName}__wrapper`}>
            <NavLink
                className={`${displayName} ${
                    isGap ? `${displayName}--multiple` : `${displayName}--alone`
                }`}
                to={`/category/${content}`}
                aria-label={`'${content}' 카테고리 검색`}
            >
                {`${content}${count ? `(${count})` : ""}`}
            </NavLink>
        </li>
    );
};

export default memo(CategoryBtn);
