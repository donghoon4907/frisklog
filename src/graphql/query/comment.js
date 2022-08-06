import { gql } from "@apollo/client";

import { CORE_COMMENT_FIELDS } from "../fragment/comment";
import { CORE_PLATFORM_FIELDS } from "../fragment/platform";

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
    ${CORE_PLATFORM_FIELDS}
    query GetComments(
        $cursor: String
        $limit: Int!
        $order: [[String]]
        $postId: String!
    ) {
        comments(
            after: $cursor
            limit: $limit
            order: $order
            postId: $postId
        ) {
            totalCount
            pageInfo {
                endCursor
                hasNextPage
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

                        Platform {
                            ...CorePlatformFields
                        }
                    }
                }
            }
        }
    }
`;
