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
            type="button"
            aria-label="Remove category"
            onClick={() => onClick(content)}
        >
            <Close
                style={{
                    marginLeft: 10,
                    fill: "white",
                    width: 20,
                    height: 20
                }}
            />
        </button>
    </Category>
);

export default memo(CategoryWithClose);
