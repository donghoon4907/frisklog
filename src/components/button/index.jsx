import React from "react";

/**
 * 공통 버튼 컴포넌트
 *
 */
const Button = ({ children, className = "", disabled, ...props }) => (
    <button
        className={`fr-btn ${disabled ? "fr-btn--disabled" : ""} ${className}`}
        {...props}
        disabled={disabled}
    >
        {children}
    </button>
);
export default Button;
