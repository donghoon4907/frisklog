import React, { useState, useCallback } from "react";

import Meta from "../../components/Meta";
import { Select } from "../../components/Form";
import searchOptions from "../../json/search_options.json";
import ScrollList from "../../components/ScrollList";
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
        <>
            <Meta
                title={`Frisklog - ${query}`}
                description={`Frisklog ${query} 검색결과입니다.`}
                url={`/search/${content}`}
            />
            <div className="fr-main__title">
                <span>&quot;{query}&quot; 검색결과</span>
                <div>
                    <Select
                        value={order}
                        onChange={handleChangeOrder}
                        title="정렬"
                    >
                        {searchOptions.sort
                            .filter(({ enable }) => enable === true)
                            .map(({ text, value, id }) => (
                                <option value={value} key={id}>
                                    {text}
                                </option>
                            ))}
                    </Select>
                </div>
            </div>
            <ScrollList
                type="posts"
                query={GET_POSTS}
                fetchPolicy="network-only"
                variables={{
                    limit: 12,
                    searchKeyword: query,
                    order: [order.split("_")]
                }}
                Item={PostItem}
            />
        </>
    );
};

export default SearchPostPage;
