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
        <div title="Search">
            <button onClick={handleClick} aria-label="Search">
                <Search />
            </button>
        </div>
    );
};

export default SearchBtn;
