import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";

/**
 * 공통 링크 컴포넌트
 *
 * @param {string}  props.domainUrl   도메인 경로
 * @param {string}  props.path        파일 경로
 * @param {boolean} props.isInternal  인사이트 여부
 * @param {string}  props.ariaLabel   aria-label
 */
const Link = forwardRef(
    ({ children, domainUrl, path, isInternal, ariaLabel, ...props }, ref) => {
        if (isInternal) {
            return (
                <NavLink to={path} aria-label={ariaLabel} ref={ref} {...props}>
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
    }
);

export default Link;
