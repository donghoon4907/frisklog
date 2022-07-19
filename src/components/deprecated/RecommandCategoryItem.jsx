import React, { useState, useRef, useCallback, memo } from "react";
import { Overlay } from "react-bootstrap";
import { useSelector } from "../../context";
import BtnLink from "../button/BtnLink";

/**
 * * 추천 카테고리 랜더링 컴포넌트
 *
 * @param props.content 카테고리명
 * @deprecated
 *
 */
const RecommandCategoryItem = ({ content }) => {
    const displayName = "fr-category";
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { isCollapseNav } = useSelector();
    /**
     * 튤팁 보이기 상태 모듈 활성화
     */
    const [show, setShow] = useState(false);
    /**
     * btn element
     */
    const $btn = useRef(null);
    /**
     * btn mouse enter 핸들러
     */
    const handleEnterBtn = useCallback(() => {
        if (isCollapseNav === "contract") {
            setShow(true);
        }
    }, [isCollapseNav]);
    /**
     * btn mouse leave 핸들러
     */
    const handleLeaveBtn = useCallback(() => {
        if (isCollapseNav === "contract") {
            setShow(false);
        }
    }, [isCollapseNav]);

    return (
        <li
            className={`${displayName}-wrapper`}
            ref={$btn}
            onMouseEnter={handleEnterBtn}
            onMouseLeave={handleLeaveBtn}
        >
            <BtnLink to={`/category/${content}`}>
                {isCollapseNav === "contract"
                    ? content.substring(0, 1)
                    : content}
            </BtnLink>
            <Overlay target={$btn.current} show={show} placement="right">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            backgroundColor: "white",
                            padding: "2px 10px",
                            borderRadius: 3,
                            zIndex: 3,
                            left: 12,
                            boxShadow:
                                "0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <em className={displayName}>{content}</em>
                    </div>
                )}
            </Overlay>
        </li>
    );
};

export default memo(RecommandCategoryItem);
