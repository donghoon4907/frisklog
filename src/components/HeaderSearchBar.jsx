import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "../context";
import { HIDE_SEARCH_BAR } from "../context/action";
import { Label } from "./Form";

/**
 * 검색 바 컴포넌트
 *
 */
const HeaderSearchBar = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    // 검색어
    const [searchKeyword, setSearchKeyword] = useState("");

    const $search = useRef(null);
    // 검색어 변경 핸들러
    const handleChange = useCallback((e) => {
        setSearchKeyword(e.target.value);
    }, []);
    // 검색 핸들러
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            if (!searchKeyword) {
                return alert("검색어를 입력하세요");
            }
            // 페이지 이동
            history.push(`/search/${searchKeyword}`);
            // 검색바 숨기기
            dispatch({
                type: HIDE_SEARCH_BAR
            });
        },
        [searchKeyword]
    );

    useEffect(() => {
        $search.current.focus();
    }, []);

    return (
        <form className="fr-header__search__form" onSubmit={handleSubmit}>
            <Label
                id="search"
                value={searchKeyword}
                label="검색어를 입력하세요."
            />
            <div className="fr-header__search__input-wrapper">
                <input
                    className="fr-input fr-input--alone fr-header__search__input"
                    placeholder="검색어를 입력하세요."
                    id="search"
                    value={searchKeyword}
                    onChange={handleChange}
                    autoComplete="off"
                    ref={$search}
                />
            </div>
        </form>
    );
};

export default HeaderSearchBar;
