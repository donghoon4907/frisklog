import React from "react";
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

export const FormInput = ({ children, isAlone, ...props }) => (
    <div className={`${displayName}__input`}>
        <div
            className={`fr-input__wrapper ${isAlone ? "fr-input--alone" : ""}`}
        >
            <Label {...props} />
            <Input {...props} isAlone={isAlone} />
        </div>

        {children}
    </div>
);

export const FormTextArea = ({ children, ...props }) => (
    <div className={`${displayName}__input`}>
        <Label {...props} />
        <TextArea {...props} />
        {children}
    </div>
);
