import React from "react";
import Meta from "../../components/Meta";
// import { Select } from "../../components/Form";
// import searchOptions from "../../json/search_options.json";
import ScrollList from "../../components/ScrollList";
import { GET_CATEGORY_POSTS } from "../../graphql/query/post";
import PostItem from "../../components/PostItem";

/**
 * 카테고리 검색 화면 컴포넌트
 *
 */
const SearchCategoryPage = ({
    match: {
        params: { content }
    }
}) => {
    // 정렬
    // const [order, setOrder] = useState("createdAt_DESC");
    // 정렬 변경 핸들러
    // const handleChangeOrder = useCallback((e) => {
    //     setOrder(e.target.value);
    // }, []);

    return (
        <>
            <Meta title={`Frisklog - #${content}`} />
            <div className="fr-main__title">
                <span>#{content} 검색결과</span>
                <div>
                    {/* <Select
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
                    </Select> */}
                </div>
            </div>
            <ScrollList
                type="postsByCategory"
                query={GET_CATEGORY_POSTS}
                fetchPolicy="cache-first"
                variables={{
                    limit: 12,
                    content
                }}
                Item={PostItem}
            />
        </>
    );
};

export default SearchCategoryPage;
