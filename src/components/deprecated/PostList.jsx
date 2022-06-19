import React from "react";
import { GET_POSTS } from "../../graphql/query/post";
import Query from "../Query";
import Scroll from "../Scroll";
import PostListTypeItem from "../PostListTypeItem";
import PostCardTypeItem from "../PostCardTypeItem";
import NoData from "../NoData";
import { useSelector } from "../../context";

/**
 * * 페이지 게시물 렌더링 컴포넌트
 *
 * @param {string}   renderType    렌더링 타입 설정
 * @param {number}   limit         요청 목록 수
 * @param {string}   order         정렬
 * @param {string?}  searchKeyword 검색어
 * @param {string?}  category      카테고리
 * @param {string?}  userId        사용자 ID
 */
const PostList = ({
    renderType,
    limit,
    order,
    searchKeyword,
    category,
    userId,
    children
}) => {
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { breakpoint } = useSelector();

    return (
        <Query
            query={GET_POSTS}
            variables={{
                limit,
                order,
                searchKeyword,
                category,
                userId
            }}
            notifyOnNetworkStatusChange={true}
        >
            {({ data: { posts }, loading, fetchMore }) =>
                children({
                    count: posts.count,
                    posts: (
                        <div className="fr-grid-wrapper">
                            {posts.rows.length > 0 ? (
                                <>
                                    {posts.rows.map((post) => {
                                        if (breakpoint === "xs") {
                                            return (
                                                <PostCardTypeItem
                                                    key={post.id}
                                                    {...post}
                                                />
                                            );
                                        } else {
                                            return (
                                                <PostListTypeItem
                                                    key={post.id}
                                                    renderType={renderType}
                                                    {...post}
                                                />
                                            );
                                        }
                                    })}
                                    <Scroll
                                        loading={loading}
                                        onBottom={() => {
                                            if (
                                                posts.rows.length > 0 &&
                                                posts.rows.length % limit !== 0
                                            ) {
                                                return;
                                            }

                                            fetchMore({
                                                variables: {
                                                    limit,
                                                    order,
                                                    searchKeyword,
                                                    category,
                                                    userId,
                                                    offset: posts.rows.length
                                                },
                                                updateQuery: (
                                                    prev,
                                                    { fetchMoreResult }
                                                ) => {
                                                    if (!fetchMoreResult) {
                                                        return prev;
                                                    }

                                                    return {
                                                        posts: {
                                                            rows: [
                                                                ...prev.posts
                                                                    .rows,
                                                                ...fetchMoreResult
                                                                    .posts.rows
                                                            ],
                                                            count: posts.count
                                                        }
                                                    };
                                                }
                                            });
                                        }}
                                    />
                                </>
                            ) : (
                                <NoData />
                            )}
                        </div>
                    )
                })
            }
        </Query>
    );
};

export default PostList;
