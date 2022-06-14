import React from "react";
import Subject from "../../components/Subject";
import Meta from "../../components/Meta";
import Query from "../../components/Query";
import { GET_RECOMMENDERS } from "../../graphql/query/user";
import { GET_POSTS } from "../../graphql/query/post";
import PostCardTypeItem from "../../components/PostCardTypeItem";
import Carousel from "../../components/Carousel";
import UserCardTypeItem from "../../components/UserCardTypeItem";
import List from "../../components/List";

/**
 * 메인 화면 컴포넌트
 *
 */
const Feed = () => (
    <div>
        <Meta />
        <Query
            query={GET_RECOMMENDERS}
            variables={{
                limit: 10
            }}
        >
            {({ data: { recommenders } }) => {
                if (recommenders.length === 0) {
                    return null;
                }

                return (
                    <>
                        <Subject>추천 블로거</Subject>
                        <Carousel>
                            {recommenders.map((user) => (
                                <UserCardTypeItem
                                    key={`user${user.id}`}
                                    {...user}
                                />
                            ))}
                        </Carousel>
                    </>
                );
            }}
        </Query>
        <Subject>신규 게시물</Subject>
        <div className="fr-postcard-wrapper">
            <List
                type="posts"
                query={GET_POSTS}
                variables={{
                    limit: 12,
                    order: "createdAt_DESC"
                }}
                Item={PostCardTypeItem}
            />
        </div>
    </div>
);

export default Feed;
