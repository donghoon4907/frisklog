import { gql } from "@apollo/client";

/**
 * 댓글 검색
 *
 * @param $cursor 커서
 * @param $limit  요청 목록의 수
 * @param $postId 게시물 ID
 */
export const GET_COMMENTS = gql`
    query GetComments($cursor: String, $limit: Int!, $postId: String!) {
        comments(cursor: $cursor, limit: $limit, postId: $postId) {
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
    }
`;
