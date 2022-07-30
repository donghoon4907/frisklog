import React from "react";

/**
 * 공통 버튼 컴포넌트
 *
 */
const Button = ({ children, className = "", ...props }) => (
    <button className={`fr-btn ${className}`} {...props}>
        {children}
    </button>
);
export default Button;
