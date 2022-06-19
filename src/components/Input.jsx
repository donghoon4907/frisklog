import React, { forwardRef } from "react";

/**
 * * 공통 input 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Input = forwardRef(({ setValue, isAlone, ...props }, ref) => (
    <input
        className={`fr-form__input ${isAlone ? "fr-form__input--alone" : ""}`}
        ref={ref}
        {...props}
    />
));

export default Input;
