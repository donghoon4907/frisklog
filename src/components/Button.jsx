import React from "react";

/**
 * 공통 버튼 컴포넌트
 *
 */
const Button = ({ children, ...props }) => (
    <button className="fr-btn fr-link" {...props}>
        {children}
    </button>
);
export default Button;
