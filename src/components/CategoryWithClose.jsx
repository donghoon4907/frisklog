import React, { memo } from "react";

import Category from "./Category";
import { Close } from "../assets/icon";

/**
 * 카테고리 랜더링 컴포넌트
 *
 * @param {string}  props.content 카테고리명
 */
const CategoryWithClose = ({ content, onClick }) => (
    <Category content={content}>
        <button
            className="fr-category--close"
            type="button"
            aria-label="카테고리 삭제"
            onClick={() => onClick(content)}
        >
            <Close
                style={{
                    marginLeft: 10,
                    width: 20,
                    height: 20
                }}
            />
        </button>
    </Category>
);

export default memo(CategoryWithClose);
