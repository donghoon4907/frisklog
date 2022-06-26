import React, { useState, forwardRef, Children } from "react";
import { Dropdown as BootstrapDropdown, Form } from "react-bootstrap";

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
 * 드롭다운 컴포넌트
 *
 * @param           props.children
 * @param {string}  props.id       아이디
 * @param {svg}     props.icon     드롭다운 아이콘
 * @param {boolean} props.isFilter 필터 사용 여부
 *
 */
export const Dropdown = ({ children, id, icon, isFilter }) => {
    return (
        <BootstrapDropdown>
            <BootstrapDropdown.Toggle
                as={CustomToggle}
                id={`dropdown-custom${id}`}
            >
                {icon}
            </BootstrapDropdown.Toggle>
            <BootstrapDropdown.Menu as={isFilter && CustomMenu}>
                {children}
            </BootstrapDropdown.Menu>
        </BootstrapDropdown>
    );
};

/**
 * 드롭다운 아이템 컴포넌트
 *
 */
export const DropdownItem = ({ children, ...props }) => (
    <BootstrapDropdown.Item {...props}>
        <span className="fr-dropdown__text">{children}</span>
    </BootstrapDropdown.Item>
);
