import { gql } from '@apollo/client'

/**
 * * 게시물 검색
 *
 * @query
 * @author frisk
 * @param $skip           건너뛸 목록의 수
 * @param $first          요청 목록의 수
 * @param $orderBy        정렬
 * @param $query          검색어
 * @param $category       카테고리
 * @param $userId         사용자 ID
 * @param $notNullThumb   썸네일 있는 것만 요청할 지
 */
export const GET_POSTS = gql`
    query GetPosts(
        $skip: Int
        $first: Int
        $orderBy: String
        $query: String
        $category: String
        $userId: String
        $notNullThumb: Boolean
    ) {
        posts(
            skip: $skip
            first: $first
            orderBy: $orderBy
            query: $query
            category: $category
            userId: $userId
            notNullThumb: $notNullThumb
        ) {
            data {
                id
                title
                description
                user {
                    id
                    nickname
                    avatar {
                        url
                    }
                }
                likeCount
                likes {
                    id
                    user {
                        id
                    }
                }
                createdAt
                updatedAt
                viewCount
                commentCount
                category
                thumbnail
            }
            total
        }
    }
`

/**
 * * 게시물 상세 로드
 *
 * @query
 * @author frisk
 * @param $id 건너뛸 목록의 수
 */
export const GET_POST = gql`
    query GetPost($id: String!) {
        post(id: $id) {
            id
            title
            description
            content
            user {
                id
                nickname
                avatar {
                    url
                }
            }
            likeCount
            likes {
                id
                user {
                    id
                }
            }
            createdAt
            updatedAt
            viewCount
            category
        }
    }
`
