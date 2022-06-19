import React from "react";
import { Link } from "react-router-dom";

/**
 * 카테고리 랜더링 컴포넌트
 *
 * @param {string}  props.content 카테고리명
 * @param {boolean} props.isGap   간격 사용 여부
 */
const CategoryBtn = ({ content, isGap }) => {
    const displayName = "fr-category";

    return (
        <li className={`${displayName}__wrapper`}>
            <Link
                className={`${displayName} ${
                    isGap ? `${displayName}--multiple` : `${displayName}--alone`
                }`}
                to={`/category/${content}`}
                aria-label={content}
            >
                <span tabIndex="-1">{content}</span>
            </Link>
        </li>
    );
};

export default CategoryBtn;
