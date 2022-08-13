import React from "react";

import LikeButton from "./LikeButton";
import { Close } from "../assets/icon";

/**
 * 카테고리 랜더링 컴포넌트
 *
 * @param {string}  props.content 카테고리명
 */
const TextWithClose = ({ id, text, onClick }) => (
    <div style={{ display: "inline-block" }}>
        <LikeButton className="fr-btn--primary" content={text}>
            <button
                className="fr-category--close"
                type="button"
                aria-label="선택한 수신인 삭제"
                onClick={() => onClick(id)}
            >
                <Close
                    style={{
                        marginLeft: 10,
                        width: 20,
                        height: 20
                    }}
                />
            </button>
        </LikeButton>
    </div>
);

export default TextWithClose;
