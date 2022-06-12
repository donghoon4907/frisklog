import React from "react";
import Subject from "../../components/Subject";
import Meta from "../../components/Meta";
import Query from "../../components/Query";
import { GET_RECOMMENDERS } from "../../graphql/query/user";
import { GET_POSTS } from "../../graphql/query/post";
import PostCardTypeItem from "../../components/PostCardTypeItem";
import Carousel from "../../components/Carousel";
import Avatar from "../../components/Avatar";

/**
 * 메인 화면 컴포넌트
 *
 */
const Feed = () => (
    <div>
        <Meta />
        <Subject>추천 블로거</Subject>
        <div style={{ marginBottom: 24, width: "100%" }}>
            <Query
                query={GET_RECOMMENDERS}
                variables={{
                    limit: 10
                }}
            >
                {({ data: { recommenders } }) => (
                    <Carousel>
                        {recommenders.map((user) => (
                            <div className="fr-carousel__item" key={user.id}>
                                <div className="fr-usercard">
                                    <div className="fr-usercard__header">
                                        <span className="fr-avatar__name">
                                            {user.nickname}
                                        </span>
                                        <span>{user.PostCount} Posts</span>
                                    </div>
                                    <div className="fr-usercard__body">
                                        <Avatar
                                            userId={user.id}
                                            size={100}
                                            src={user.avatar}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                )}
            </Query>
        </div>
        <Subject>신규 게시물</Subject>
        <div className="fr-postcard-wrapper">
            <Query
                query={GET_POSTS}
                variables={{
                    limit: 9,
                    order: "createdAt_DESC"
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
    </div>
);

export default Feed;
