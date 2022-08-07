import { gql } from "@apollo/client";

import { CORE_POST_FIELDS } from "../fragment/post";

/**
 * 게시물 검색
 *
 * @param $cursor        커서
 * @param $limit         요청 목록의 수
 * @param $order         정렬
 * @param $searchKeyword 검색어
 * @param $userId        사용자 ID
 * @param $isLike        내가 좋아요한 포스트 여부(userId 필요)
 * @param $isFollowing   내가 팔로잉한 포스트 여부(userId 필요)
 */
export const GET_POSTS = gql`
    ${CORE_POST_FIELDS}
    query GetPosts(
        $cursor: String
        $order: [[String]]
        $limit: Int!
        $searchKeyword: String
        $userId: String
        $isLike: Boolean
        $isFollowing: Boolean
    ) {
        posts(
            after: $cursor
            order: $order
            limit: $limit
            searchKeyword: $searchKeyword
            userId: $userId
            isLike: $isLike
            isFollowing: $isFollowing
        ) {
            totalCount
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
                    ...CorePostFields

                    User {
                        id
                        nickname
                        avatar
                        link
                    }
                    Likers {
                        id
                    }

                    Categories {
                        content
                    }
                }
            }
        }
    }
`;

/**
 * 카테고리별 게시물 검색
 *
 * @param $content 카테고리명
 * @param $cursor  포스트 커서
 * @param $limit   포스트 요청 목록의 수
 */
export const GET_CATEGORY_POSTS = gql`
    ${CORE_POST_FIELDS}
    query GetPostsByCategory($content: String!, $cursor: String, $limit: Int!) {
        postsByCategory(content: $content, after: $cursor, limit: $limit) {
            totalCount
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
                    ...CorePostFields

                    User {
                        id
                        nickname
                        avatar
                        link
                    }
                    Likers {
                        id
                    }

                    Categories {
                        content
                    }
                }
            }
        }
    }
`;
