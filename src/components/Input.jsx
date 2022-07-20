import React, { forwardRef } from "react";

/**
 * 공통 input 컴포넌트
 *
 */
const Input = forwardRef(({ setValue, isExpand, ...props }, ref) => (
    <input
        className={`fr-input ${isExpand ? "fr-input--expand" : ""}`}
        ref={ref}
        {...props}
    />
));

export default Input;
