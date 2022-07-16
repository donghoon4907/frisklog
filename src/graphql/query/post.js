import { gql } from "@apollo/client";

/**
 * 게시물 검색
 *
 * @param $offset         건너뛸 목록의 수
 * @param $limit          요청 목록의 수
 * @param $order          정렬
 * @param $searchKeyword  검색어
 * @param $category       카테고리
 * @param $userId         사용자 ID
 * @param $isLike         내가 좋아요한 포스트 여부(마이페이지에서 사용, userId 필요)
 */
export const GET_POSTS = gql`
    query GetPosts(
        $offset: Int
        $limit: Int!
        $order: String
        $searchKeyword: String
        $category: String
        $userId: String
        $isLike: Boolean
    ) {
        posts(
            offset: $offset
            limit: $limit
            order: $order
            searchKeyword: $searchKeyword
            category: $category
            userId: $userId
            isLike: $isLike
        ) {
            rows {
                id
                content
                User {
                    id
                    nickname
                    avatar
                    Platform {
                        id
                        platformName
                        logoUrl
                    }
                }
                Categories {
                    content
                }
                Likers {
                    id
                }
                createdAt
                updatedAt
            }
            count
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
