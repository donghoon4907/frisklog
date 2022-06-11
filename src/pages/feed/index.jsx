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
        <Subject>추천 블로거</Subject>
        <div style={{ marginBottom: 24, width: "100%" }}>
            {/* <div style={{ position: "relative"}}>
                <div style={{ display: "flex", overflowY: "scroll"}}>
                    <div>
                        <div style={{ marginRight: 20, marginBottom: 20, maxHeight: 90, position: "relative"}}>
                            <div style={{ backgroundColor: "black", borderRadius: 3, position: "relative", width: 300, display: "flex"}}>
                                <a style={{ position: "absolute", top: 0, left:0, right: 0, bottom: 0}}></a>
                                <div style={{ flex: 1, margin: "10px 0"}}>
                                    <span style={{ lineHeight: 18, fontWeight: 700 }}>username</span>
                                    <div style={{ marginTop: 4, maxHeight: 36, overflow: "hidden", lineHeight: 18 }}>
                                        <a>tag</a>
                                    </div>
                                </div>
                                <div style={{ width: 64, flexShrink: 0, margin: "12px 12px 12px 8px" }}>
                                    <div style={{ paddingBottom: "100%", position: "relative", width: "100%", lineHeight: 0}}>
                                        <img style={{ borderRadius: 3, width: "100%", height: "100%", visibility: "visible", position: "absolute", top: 0, left: 0, objectFit: "cover" }}></img>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
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
