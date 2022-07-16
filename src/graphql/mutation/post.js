import { gql } from "@apollo/client";

/**
 * 게시물 추가
 *
 * @param $content     내용
 * @param $category    카테고리
 */
export const CREATE_POST = gql`
    mutation addPost($content: String, $categories: [String!]!) {
        addPost(content: $content, categories: $categories)
    }
`;

/**
 * 게시물 수정
 *
 * @param $id          게시물 ID
 * @param $content     내용
 * @param $categories  카테고리
 */
export const UPDATE_POST = gql`
    mutation updatePost($id: String!, $content: String, $categories: [String]) {
        updatePost(id: $id, content: $content, categories: $categories)
    }
`;

/**
 * 게시물 삭제
 *
 * @param $id 게시물 ID
 */
export const DELETE_POST = gql`
    mutation deletePost($id: String!) {
        deletePost(id: $id)
    }
`;

/**
 * 게시물 좋아요
 *
 * @param $id 게시물 ID
 */
export const LIKE_POST = gql`
    mutation likePost($id: String!) {
        likePost(id: $id)
    }
`;

/**
 * 게시물 좋아요 취소
 *
 * @param $id 게시물 ID
 */
export const UNLIKE_POST = gql`
    mutation unlikePost($id: String!) {
        unlikePost(id: $id)
    }
`;
