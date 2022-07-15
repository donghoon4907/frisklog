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
 * @deprecated $isThereThumb   썸네일 있는지 여부
 */
export const GET_POSTS = gql`
    query GetPosts(
        $offset: Int
        $limit: Int!
        $order: String
        $searchKeyword: String
        $category: String
        $userId: String
    ) # $isThereThumb: Boolean
    {
        posts(
            offset: $offset
            limit: $limit
            order: $order
            searchKeyword: $searchKeyword
            category: $category
            userId: $userId
        ) # isThereThumb: $isThereThumb
        {
            rows {
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

/**
 * 추천카테고리 검색
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 */
export const GET_RECOMMEND_CATEGORIES = gql`
    query GetRecommendCategories($offset: Int, $limit: Int!) {
        recommendCategories(offset: $offset, limit: $limit) {
            category
            searchCount
        }
    }
`;
