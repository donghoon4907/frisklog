import { gql } from "@apollo/client";

/**
 * 게시물 검색
 *
 * @param $cursor         커서
 * @param $limit          요청 목록의 수
 * @param $order          정렬
 * @param $searchKeyword  검색어
 * @param $userId         사용자 ID
 * @param $isLike         내가 좋아요한 포스트 여부(userId 필요)
 * @param $isFollowing    내가 팔로잉한 포스트 여부(userId 필요)
 */
export const GET_POSTS = gql`
    query GetPosts(
        $cursor: String
        $limit: Int!
        $searchKeyword: String
        $userId: String
        $isLike: Boolean
        $isFollowing: Boolean
    ) {
        posts(
            cursor: $cursor
            limit: $limit
            searchKeyword: $searchKeyword
            userId: $userId
            isLike: $isLike
            isFollowing: $isFollowing
        ) {
            id
            content
            User {
                id
                nickname
                avatar
                link
                Platform {
                    id
                    platformName
                    logoUrl
                    domainUrl
                    storageUrl
                }
            }
            Likers {
                id
            }
            Categories {
                content
            }
            createdAt
            updatedAt
        }
    }
`;

/**
 * 게시물 상세 로드
 *
 * @param $id 건너뛸 목록의 수
 */
export const GET_POST = gql`
    query GetPost($id: String!) {
        post(id: $id) {
            id
            # title
            # description
            content
            # viewCount
            category
            # thumbnail
            User {
                id
                nickname
                avatar
            }
            Likers {
                id
            }
            createdAt
            updatedAt
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
    query GetPostsByCategory($content: String!, $cursor: String, $limit: Int!) {
        postsByCategory(content: $content, cursor: $cursor, limit: $limit) {
            id
            content
            User {
                id
                nickname
                avatar
                link
                Platform {
                    id
                    platformName
                    logoUrl
                    domainUrl
                    storageUrl
                }
            }
            Likers {
                id
            }
            Categories {
                content
            }
            createdAt
            updatedAt
        }
    }
`;
