import React from "react";

import Meta from "../../components/Meta";
import { GET_POSTS } from "../../graphql/query/post";
import PostItem from "../../components/PostItem";
import ScrollList from "../../components/ScrollList";
import { useSelector } from "../../context";
import { Error } from "../../assets/icon";

/**
 * 팔로우 화면 컴포넌트
 *
 */
const Follow = () => {
    const { id } = useSelector();

    if (id === null) {
        return (
            <div>
                <Error />
                <span>&nbsp;이 페이지를 보려면 로그인해야 합니다.</span>
            </div>
        );
    }

    return (
        <>
            <Meta title="following" />
            <div className="fr-main__title">
                <h2>팔로잉 최신 포스트</h2>
            </div>
            <ScrollList
                type="posts"
                fetchPolicy="cache-and-network"
                query={GET_POSTS}
                variables={{
                    limit: 12,
                    userId: `${id}`,
                    isFollowing: true
                }}
                Item={PostItem}
            />
        </>
    );
};

export default Follow;
