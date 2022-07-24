import React from "react";

import Meta from "../../components/Meta";
import { GET_POSTS } from "../../graphql/query/post";
import PostItem from "../../components/PostItem";
import ScrollList from "../../components/ScrollList";

/**
 * 메인 화면 컴포넌트
 *
 */
const Feed = () => (
    <>
        <Meta />
        <div className="fr-main__title">
            <h2>최신 포스트</h2>
        </div>
        <ScrollList
            type="posts"
            fetchPolicy="cache-first"
            query={GET_POSTS}
            variables={{
                limit: 12
            }}
            Item={PostItem}
        />
    </>
);

export default Feed;
