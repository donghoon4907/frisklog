import React, { useState, forwardRef, Children } from "react";
import { Dropdown, Form } from "react-bootstrap";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <button
        ref={ref}
        onClick={(e) => {
            e.preventDefault();

            onClick(e);
        }}
    >
        {children}
    </button>
));

const CustomMenu = forwardRef(
    (
        {
            children,
            style,
            className,
            placeholder,
            "aria-labelledby": labeledBy
        },
        ref
    ) => {
        const [value, setValue] = useState("");

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children.toLowerCase().startsWith(value)
                    )}
                </ul>
            </div>
        );
    }
);

/**
 * 공통 버튼 컴포넌트
 *
 */
const CustomDropdown = ({ children, id, icon, isFilter }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id={`dropdown-custom${id}`}>
                {icon}
            </Dropdown.Toggle>
            <Dropdown.Menu as={isFilter && CustomMenu}>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomDropdown;
