import React from "react";
import Subject from "../../components/Subject";
import Meta from "../../components/Meta";
import Query from "../../components/Query";
import { GET_POSTS } from "../../graphql/query/post";
import PostCardTypeItem from "../../components/PostCardTypeItem";

/**
 * * 메인 화면 컴포넌트
 *
 * @Page
 * @author frist
 */
const Feed = () => (
    <div>
        <Meta />
        <Subject>추천 게시물</Subject>
        <div className="fr-card-wrapper">
            <Query
                query={GET_POSTS}
                variables={{
                    limit: 9,
                    order: "viewCount_DESC"
                }}
            >
                {({ data: { posts } }) =>
                    posts.rows.map((post) => (
                        <PostCardTypeItem key={post.id} {...post} />
                    ))
                }
            </Query>
        </div>
        <hr />
        {/* <Subject>인기 게시물</Subject>
        <div className="fr-card-wrapper">
            <Query
                query={GET_POSTS}
                variables={{
                    first: 5,
                    orderBy: "likeCount_DESC",
                    notNullThumb: true
                }}
            >
                {({ data: { posts } }) =>
                    posts.data.map((post) => (
                        <PostCardTypeItem key={post.id} {...post} />
                    ))
                }
            </Query>
        </div> */}
    </div>
);

export default Feed;
