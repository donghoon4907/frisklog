import React from "react";
import Meta from "../../components/Meta";
import Query from "../../components/Query";
import { GET_RECOMMENDERS } from "../../graphql/query/user";
import { GET_POSTS } from "../../graphql/query/post";
import PostItem from "../../components/PostItem";
import Carousel from "../../components/Carousel";
import UserCardTypeItem from "../../components/UserCardTypeItem";
import List from "../../components/List";

/**
 * 메인 화면 컴포넌트
 *
 */
const Feed = () => (
    <>
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
                        <div className="fr-main__title">
                            <h2>추천인</h2>
                        </div>
                        <Carousel>
                            {recommenders.map((user) => (
                                <UserCardTypeItem
                                    key={`user${user.id}`}
                                    {...user}
                                />
                            ))}
                        </Carousel>
                        <br />
                    </>
                );
            }}
        </Query>

        <div className="fr-main__title activeEscape">
            <h2>최근 게시물</h2>
        </div>
        <List
            type="posts"
            query={GET_POSTS}
            variables={{
                limit: 12,
                order: "createdAt_DESC"
            }}
            fetchMoreType="scroll"
            Item={PostItem}
        />
    </>
);

export default Feed;
