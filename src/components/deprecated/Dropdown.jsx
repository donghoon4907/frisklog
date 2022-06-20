import React, { useState, useCallback, memo } from "react";
import { More } from "../../assets/icon";
import UpdatePostBtn from "../button/UpdatePost";

const displayName = "fr-dropdown";

/**
 * 드롭다운 컴포넌트
 *
 */
export const DropdownBtn = () => {
    const [show, setShow] = useState(false);

    const handleClick = useCallback(() => {
        setShow(!show);
    }, [show]);

    return (
        <div className={`${displayName}__wrapper`}>
            <div className={`${displayName}__icon`}>
                <button onClick={handleClick}>
                    <More />
                    <span className="a11y-hidden">드롭다운</span>
                </button>
            </div>
            {show && (
                <Dropdown>
                    <DropdownItem>
                        <UpdatePostBtn />
                    </DropdownItem>
                </Dropdown>
            )}
        </div>
    );
};
/**
 * 드롭다운 아이템 컴포넌트
 *
 */
export const Dropdown = ({ children }) => (
    <ul className={displayName}>{children}</ul>
);

/**
 * 드롭다운 아이템 컴포넌트
 *
 */
export const DropdownItem = memo(({ children }) => (
    <li className={`${displayName}__item`}>{children}</li>
));
