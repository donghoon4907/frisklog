import React, { forwardRef } from "react";

/**
 * 공통 input 컴포넌트
 *
 */
const Switch = forwardRef(({ setValue, isExpand, ...props }, ref) => (
    <div className="fr-switch__wrapper">
        <input type="checkbox" id={id} {...props} />
        <label htmlFor={id}>{label}</label>
    </div>
    // <input
    //     className={`fr-input ${isExpand ? "fr-input--expand" : ""}`}
    //     ref={ref}
    //     {...props}
    // />
));

export default Switch;
