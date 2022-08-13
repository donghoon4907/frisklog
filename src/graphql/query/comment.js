import { gql } from "@apollo/client";

import { CORE_COMMENT_FIELDS } from "../fragment/comment";

/**
 * 댓글 검색
 *
 * @param $cursor 커서
 * @param $limit  요청 목록의 수
 * @param $order  정렬
 * @param $postId 게시물 ID
 */
export const GET_COMMENTS = gql`
    ${CORE_COMMENT_FIELDS}
    query GetComments(
        $before: String
        $after: String
        $limit: Int!
        $order: [[String]]
        $postId: String!
    ) {
        comments(
            before: $before
            after: $after
            limit: $limit
            order: $order
            postId: $postId
        ) {
            totalCount
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    ...CoreCommentFields

                    User {
                        id
                        nickname
                        avatar
                        link
                    }
                }
            }
        }
    }
`;
