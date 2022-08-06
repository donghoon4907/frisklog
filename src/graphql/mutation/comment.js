import { gql } from "@apollo/client";

import { CORE_COMMENT_FIELDS } from "../fragment/comment";

/**
 * 댓글 추가
 *
 * @param $postId  게시물 ID
 * @param $content 내용
 */
export const CREATE_COMMENT = gql`
    ${CORE_COMMENT_FIELDS}
    mutation addComment($postId: String!, $content: String!) {
        addComment(postId: $postId, content: $content) {
            ...CoreCommentFields
        }
    }
`;

/**
 * 댓글 수정
 *
 * @param $id      댓글 ID
 * @param $content 내용
 */
export const UPDATE_COMMENT = gql`
    mutation updateComment($id: String!, $content: String!) {
        updateComment(id: $id, content: $content)
    }
`;

/**
 * 댓글 삭제
 *
 * @param $id    댓글 ID
 */
export const DELETE_COMMENT = gql`
    mutation deleteComment($id: String!) {
        deleteComment(id: $id)
    }
`;
