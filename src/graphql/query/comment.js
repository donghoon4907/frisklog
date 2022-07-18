import { gql } from "@apollo/client";

/**
 * 댓글 검색
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 * @param $order  정렬
 * @param $postId 게시물 ID
 */
export const GET_COMMENTS = gql`
    query GetComments(
        $offset: Int
        $limit: Int!
        $order: String
        $postId: String
    ) {
        comments(
            offset: $offset
            limit: $limit
            order: $order
            postId: $postId
        ) {
            rows {
                id
                content
                createdAt
                updatedAt
                User {
                    id
                    nickname
                    avatar
                    link
                    Platform {
                        id
                        domainUrl
                        storageUrl
                    }
                }
            }
            count
        }
    }
`;
