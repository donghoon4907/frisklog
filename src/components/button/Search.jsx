import React, { useCallback } from "react";
import { useSelector, useDispatch } from "../../context";
import { SHOW_SEARCH_BAR, HIDE_SEARCH_BAR } from "../../context/action";
import { Search } from "../../assets/icon";

/**
 * 검색 아이콘 컴포넌트
 *
 */
const SearchBtn = () => {
    const dispatch = useDispatch();

    const { isShowSearchBar } = useSelector();
    // 클릭 핸들러
    const handleClick = useCallback(() => {
        // 검색바 보이기 / 숨기기
        dispatch({
            type: isShowSearchBar ? HIDE_SEARCH_BAR : SHOW_SEARCH_BAR
        });
    }, [isShowSearchBar]);

    return (
        <button onClick={handleClick} type="button" title="검색">
            <Search />
            <span className="a11y-hidden">
                {isShowSearchBar ? "검색바 닫기" : "검색바 열기"}
            </span>
        </button>
    );
};

export default SearchBtn;
