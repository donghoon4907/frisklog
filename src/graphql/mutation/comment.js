import { gql } from "@apollo/client";

/**
 * 댓글 추가
 *
 * @param $postId  게시물 ID
 * @param $content 내용
 * @param $isDev   개발중 여부
 */
export const CREATE_COMMENT = gql`
    mutation addComment($postId: String!, $content: String!, $isDev: Boolean) {
        addComment(postId: $postId, content: $content, isDev: $isDev) {
            id
            content
            createdAt
            updatedAt
        }
    }
`;

/**
 * 댓글 수정
 *
 * @param $id      댓글 ID
 * @param $content 내용
 * @param $isDev   개발중 여부
 */
export const UPDATE_COMMENT = gql`
    mutation updateComment($id: String!, $content: String!, $isDev: Boolean) {
        updateComment(id: $id, content: $content, isDev: $isDev)
    }
`;

/**
 * 댓글 삭제
 *
 * @param $id    댓글 ID
 * @param $isDev 개발중 여부
 */
export const DELETE_COMMENT = gql`
    mutation deleteComment($id: String!, $isDev: Boolean) {
        deleteComment(id: $id, isDev: $isDev)
    }
`;
