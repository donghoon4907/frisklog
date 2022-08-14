import React, { useState, useCallback } from "react";

import { FormCheckbox } from "./Form";

/**
 * 체크박스 컴포넌트
 *
 */
const Checkbox = ({ id, name, label, prefix, callback }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = useCallback(
        (e) => {
            const nextState = e.target.checked;

            setChecked(nextState);

            if (typeof callback === "function") {
                callback(id, nextState);
            }
        },
        [id]
    );

    return (
        <FormCheckbox
            label={label}
            name={name}
            id={prefix ? prefix + id : id}
            checked={checked}
            onChange={handleChange}
        />
    );
};

export default Checkbox;
