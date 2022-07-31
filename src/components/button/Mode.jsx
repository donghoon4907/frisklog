import React, { useCallback } from "react";

import { useSelector, useDispatch } from "../../context";
import { SET_THEME } from "../../context/action";
import { THEME_KEY, setStorage } from "../../lib/cookie";
import { Light, Dark } from "../../assets/icon";

/**
 * 모드 스위치 컴포넌트
 *
 */
const ModeBtn = () => {
    const dispatch = useDispatch();

    const { theme } = useSelector();

    const handleClick = useCallback(() => {
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "dark");

            dispatch({
                type: SET_THEME,
                theme: "dark"
            });

            setStorage(THEME_KEY, "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");

            dispatch({
                type: SET_THEME,
                theme: "light"
            });

            setStorage(THEME_KEY, "light");
        }
    }, [theme]);

    return (
        <div title="모드 버튼">
            <button
                type="button"
                onClick={handleClick}
                aria-label={
                    theme === "light"
                        ? "어두운 화면으로 변경"
                        : "밝은 화면으로 변경"
                }
            >
                {theme === "light" ? <Light /> : <Dark />}
            </button>
        </div>
    );
};

export default ModeBtn;
