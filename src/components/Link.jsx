import React from "react";
import { NavLink } from "react-router-dom";

/**
 * 공통 링크 컴포넌트
 *
 * @param {string} props.domainUrl   도메인 경로
 * @param {string} props.path        저장소 경로
 * @param {string} props.isInternal  인사이트 여부
 * @param {string} props.ariaLabel   aria-label
 */
const Link = ({
    children,
    domainUrl,
    path,
    isInternal,
    ariaLabel,
    ...props
}) => {
    if (isInternal) {
        return (
            <NavLink to={path} aria-label={ariaLabel} {...props}>
                {children}
            </NavLink>
        );
    }

    return (
        <a
            href={domainUrl + path}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`새 탭에서 ${ariaLabel} 열기`}
            {...props}
        >
            {children}
        </a>
    );
};

export default Link;
