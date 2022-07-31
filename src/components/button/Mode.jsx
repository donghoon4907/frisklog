import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";

import { useSelector } from "../../context";
import { THEME_KEY, setStorage } from "../../lib/cookie";

/**
 * 모드 스위치 컴포넌트
 *
 */
const ModeBtn = ({ ...props }) => {
    const { theme } = useSelector();

    const [checked, setChecked] = useState(theme === "dark");

    const handleChange = useCallback((e) => {
        setChecked(e.target.checked);

        if (e.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");

            setStorage(THEME_KEY, "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");

            setStorage(THEME_KEY, "light");
        }
    }, []);

    return (
        <Form.Check
            type="switch"
            reverse="false"
            label={checked ? "다크모드 활성화" : "다크모드 비활성화"}
            {...props}
            checked={checked}
            onChange={handleChange}
        />
    );
};

export default ModeBtn;
