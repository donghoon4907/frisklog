import React, { useState, useCallback } from "react";
import Meta from "../../components/Meta";
import Subject from "../../components/Subject";
import { Select } from "../../components/Form";
import searchOptions from "../../json/search_options.json";
import List from "../../components/List";
import { GET_POSTS } from "../../graphql/query/post";
import PostItem from "../../components/PostItem";

/**
 * 포스트 검색 화면 컴포넌트
 *
 */
const SearchPostPage = ({
    match: {
        params: { query }
    }
}) => {
    // 정렬
    const [order, setOrder] = useState("createdAt_DESC");
    // 정렬 변경 핸들러
    const handleChangeOrder = useCallback((e) => {
        setOrder(e.target.value);
    }, []);

    return (
        <div>
            <Meta title={`Frisklog - ${query}`} />
            <div>
                <Subject>
                    <span>&quot;{query}&quot; 검색결과</span>
                    <div>
                        <Select
                            value={order}
                            onChange={handleChangeOrder}
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
            <List
                type="posts"
                query={GET_POSTS}
                variables={{
                    limit: 12,
                    order,
                    searchKeyword: query
                }}
                fetchMoreType="scroll"
                Item={PostItem}
            />
        </div>
    );
};

export default SearchPostPage;
