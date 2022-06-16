import React from "react";
// import Subject from "../../components/Subject";
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
    <div className="fr-app__feed">
        <Meta />
        <div className="fr-main__wrapper">
            <main className="fr-main">
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
                                    <span>추천인</span>
                                </div>
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
                <br />
                <div className="fr-main__title">
                    <span>최근 게시물</span>
                </div>
                <List
                    type="posts"
                    query={GET_POSTS}
                    variables={{
                        limit: 12,
                        order: "createdAt_DESC"
                    }}
                    Item={PostItem}
                />
            </main>
        </div>
        <div className="fr-aside__wrapper">
            <aside className="fr-aside">
                <div className="fr-recommend__wrapper">
                    <div className="fr-recommend__title">추천 카테고리</div>
                    <ul
                        className="fr-recommend"
                        aria-label="추천 카테고리"
                    ></ul>
                </div>
            </aside>
        </div>
    </div>
);

export default Feed;
