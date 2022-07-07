import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { getBreakpoint } from "../lib/responsive";

/**
 * Commonly used input settings
 *
 * @param {string} props.defaultValue 기본값
 * @param {string} props.where        텍스트 조건 설정
 *
 */
export const useInput = (defaultValue, where) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = useCallback((e) => {
        if (where === "no_space") {
            setValue(e.target.value.replace(/(^\s*)|(\s*$)/g, ""));
        } else {
            setValue(e.target.value);
        }
    }, []);

    return { value, onChange, setValue };
};
/**
 * Delay time occurs when changing state
 *
 * @param {string} props.defaultValue 기본값
 * @param {string} props.delay        지연시간
 *
 */
export const useDebounce = (defaultValue, delay) => {
    const [value, setValue] = useState("");
    const [state, setState] = useState(defaultValue);

    useEffect(() => {
        if (value === state) return;
        const timeout = setTimeout(() => setValue(state), delay);

        return () => clearTimeout(timeout);
    }, [value, state]);

    return [value, setState];
};
/**
 * Call axios
 *
 */
export const useLazyAxios = () => {
    const [loading, setLoading] = useState(false);

    const call = useCallback(
        async (options) => {
            const result = {};
            setLoading(true);
            try {
                const { data } = await axios(options);
                result.data = data;
            } catch (error) {
                result.error = error;
            }
            setLoading(false);
            return result;
        },
        [loading]
    );

    return { loading, call };
};
/**
 * Subscribe to resize event to update breakpoint state
 *
 */
export const useResize = () => {
    const [breakpoint, setBreakpoint] = useState(false);

    const handleResize = useCallback((e) => {
        const { innerWidth } = e.target;

        const { breakpoint } = getBreakpoint(innerWidth);

        setBreakpoint(breakpoint);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        window.dispatchEvent(new Event("resize"));

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return [breakpoint];
};
/**
 * Convert image to landscape or portrait
 *
 */
export const useResizeImage = (wrapperRef) => {
    // 이미지 로딩 여부
    const [ready, setReady] = useState(true);

    useEffect(() => {
        const imgs = wrapperRef.current.querySelectorAll("img");
        // 이미지가 없는 게시물인 경우
        if (imgs.length === 0) {
            setReady(false);
        }
        // 이미지 리사이징
        imgs.forEach((img, idx) => {
            const obj = new Image();

            obj.src = img.src;

            obj.onload = function () {
                const width = this.width;

                const height = this.height;

                const wrapper = img.parentNode;

                wrapper.classList.add("fr-thumbnail");

                wrapper.style.paddingBottom = `calc(${height / width} * 100%)`;

                img.classList.add("fr-thumbnail__image");

                if (idx === imgs.length - 1) {
                    setReady(false);
                }
            };
        });
    }, []);

    return [ready];
};
