import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "../../context";
import { HIDE_SEARCH_BAR } from "../../context/action";
import { FormInput } from "../Form";
import Button from "../button";

/**
 * 검색 바 컴포넌트
 *
 */
const HeaderSearchBar = () => {
    const displayName = "fr-search";

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
        <div className={displayName}>
            <form className={`${displayName}__form`} onSubmit={handleSubmit}>
                <FormInput
                    placeholder="검색어를 입력하세요"
                    id="search"
                    autoComplete="off"
                    required
                    isExpand={true}
                    label="검색어"
                    ref={$search}
                    onChange={handleChange}
                    value={searchKeyword}
                >
                    <div className={`${displayName}__button`}>
                        <Button type="submit" className="fr-btn--primary">
                            검색
                        </Button>
                    </div>
                </FormInput>
            </form>
        </div>
    );
};

export default HeaderSearchBar;
