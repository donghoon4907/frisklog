import React, { useState, useCallback } from "react";
import Meta from "../../components/Meta";
import Subject from "../../components/Subject";
import { Select } from "../../components/Form";
import PostList from "../../components/PostList";
import searchOptions from "../../json/search_options.json";

/**
 * 포스트 검색 화면 컴포넌트
 *
 * @Page
 * @author frist
 */
const SearchPostPage = ({
    match: {
        params: { query }
    }
}) => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const [orderBy, setOrderBy] = useState("createdAt_DESC");
    /**
     * 정렬 변경 핸들러
     */
    const handleChangeOrderBy = useCallback((e) => {
        setOrderBy(e.target.value);
    }, []);

    return (
        <div>
            <Meta title={`Frisklog - ${query}`} />
            <div>
                <Subject>
                    <span>&quot;{query}&quot; 검색결과</span>
                    <div>
                        <Select
                            value={orderBy}
                            onChange={handleChangeOrderBy}
                            title="정렬"
                        >
                            {searchOptions.sort.map(({ text, value, id }) => (
                                <option value={value} key={id}>
                                    {text}
                                </option>
                            ))}
                        </Select>
                    </div>
                </Subject>
            </div>
            <PostList order={orderBy} searchKeyword={query} limit={30}>
                {({ posts }) => posts}
            </PostList>
        </div>
    );
};

export default SearchPostPage;
