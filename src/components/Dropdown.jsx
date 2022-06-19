import React, { useCallback, memo } from "react";
import { useDispatch, useSelector } from "../context";
import { More } from "../assets/icon";
import { SHOW_POST_DROPDOWN, HIDE_POST_DROPDOWN } from "../context/action";

const displayName = "fr-dropdown";

/**
 * 드롭다운 컴포넌트
 *
 */
export const DropdownBtn = () => {
    const dispatch = useDispatch();

    const { isShowPostDropdown, activeDropdown } = useSelector();

    const handleClick = useCallback(
        (e) => {
            const $btn = e.target.closest("button");

            const { x, y } = $btn.getBoundingClientRect();

            console.log(x);
            console.log(y);

            let type, offsetX, offsetY;
            // 동일한 포스트의 열려있는 드롭다운 클릭 시
            if (activeDropdown.offsetX === x && activeDropdown.offsetY === y) {
                type = HIDE_POST_DROPDOWN;
                offsetX = -1;
                offsetY = -1;
            } else {
                type = SHOW_POST_DROPDOWN;
                offsetX = x;
                offsetY = y;
            }

            dispatch({
                type,
                offsetX,
                offsetY
            });
        },
        [isShowPostDropdown, activeDropdown.offsetX, activeDropdown.offsetY]
    );

    return (
        <div className={`${displayName}__wrapper`}>
            <div className={`${displayName}__icon`}>
                <button onClick={handleClick}>
                    <More />
                    <span className="a11y-hidden">드롭다운</span>
                </button>
            </div>
        </div>
    );
};
/**
 * 드롭다운 아이템 컴포넌트
 *
 */
export const Dropdown = ({ children }) => {
    const { isShowPostDropdown, activeDropdown } = useSelector();

    return (
        <ul
            style={{
                transform: `translate(${activeDropdown.offsetX - 490}px, ${
                    activeDropdown.offsetY + 30
                }px)`
            }}
            className={`${displayName}${
                isShowPostDropdown ? "" : ` ${displayName}--hide`
            }`}
        >
            {children}
        </ul>
    );
};

/**
 * 드롭다운 아이템 컴포넌트
 *
 */
export const DropdownItem = memo(({ children }) => (
    <li className={`${displayName}__item`}>{children}</li>
));
