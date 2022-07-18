import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

/**
 * 공통 링크 컴포넌트
 *
 * @param {string} props.domainUrl   도메인 경로
 * @param {string} props.path        저장소 경로
 * @param {string} props.isExternal  인사이트 여부
 */
const Link = ({ children, domainUrl, path, isInternal, ...props }) => {
    if (isInternal) {
        return (
            <ReactRouterLink to={path} {...props}>
                {children}
            </ReactRouterLink>
        );
    }

    return (
        <a
            href={domainUrl + path}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        >
            {children}
        </a>
    );
};

export default Link;
