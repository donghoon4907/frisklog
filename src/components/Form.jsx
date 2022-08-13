import React, { forwardRef } from "react";
import Input from "./Input";

const displayName = "fr-form";

export const Label = ({ id, label, value }) => (
    <label
        htmlFor={id}
        className={`${displayName}__label ${displayName}__label--state-${
            value ? "typing" : "empty"
        }`}
    >
        {label}
    </label>
);

export const TextArea = ({ children, setValue, ...props }) => (
    <textarea className={`${displayName}__textarea`} {...props}>
        {children}
    </textarea>
);

export const Select = ({ children, setValue, ...props }) => (
    <select className={`${displayName}__select`} {...props}>
        {children}
    </select>
);

export const FormInput = forwardRef(
    ({ children, isExpand, id, label, value, ...props }, ref) => (
        <div className={`${displayName}__input`}>
            <div
                className={`fr-input__wrapper ${
                    isExpand ? "fr-input--expand" : ""
                }`}
            >
                <Label label={label} id={id} value={value} />
                <Input
                    {...props}
                    id={id}
                    value={value}
                    isExpand={isExpand}
                    ref={ref}
                />
            </div>

            {children}
        </div>
    )
);

export const FormTextArea = ({ children, id, label, value, ...props }) => (
    <div className={`${displayName}__input`}>
        <Label label={label} id={id} value={value} />
        <TextArea id={id} value={value} {...props} />
        {children}
    </div>
);

export const FormCheckbox = ({ label, id, ...props }) => (
    <div
        className={`${displayName}__checkbox ${
            label ? `${displayName}__checkbox--with` : ""
        }`}
    >
        <input type="checkbox" id={id} {...props} />
        <label htmlFor={id}>{label}</label>
    </div>
);
