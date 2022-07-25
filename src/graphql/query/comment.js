import { gql } from "@apollo/client";

import { CORE_COMMENT_FIELDS } from "../fragment/comment";

/**
 * 댓글 검색
 *
 * @param $cursor 커서
 * @param $limit  요청 목록의 수
 * @param $postId 게시물 ID
 */
export const GET_COMMENTS = gql`
    ${CORE_COMMENT_FIELDS}
    query GetComments($cursor: String, $limit: Int!, $postId: String!) {
        comments(cursor: $cursor, limit: $limit, postId: $postId) {
            ...CoreCommentFields

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
