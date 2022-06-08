import { gql } from "@apollo/client";

/**
 * 게시물 추가
 *
 * @param $title       제목
 * @param $description 소개
 * @param $content     내용
 * @param $category    카테고리
 * @param $thumbnail   썸네일
 * @param $isDev       개발중 여부
 */
export const CREATE_POST = gql`
    mutation addPost(
        $title: String
        $description: String
        $content: String
        $category: String
        $thumbnail: String
        $isDev: Boolean
    ) {
        addPost(
            title: $title
            description: $description
            content: $content
            category: $category
            thumbnail: $thumbnail
            isDev: $isDev
        )
    }
`;

/**
 * 게시물 수정
 *
 * @param $id          게시물 ID
 * @param $title       제목
 * @param $description 소개
 * @param $content     내용
 * @param $category    카테고리
 * @param $thumbnail   썸네일
 * @param $isDev       개발중 여부
 */
export const UPDATE_POST = gql`
    mutation updatePost(
        $id: String!
        $title: String
        $description: String
        $content: String
        $category: String
        $thumbnail: String
        $isDev: Boolean
    ) {
        updatePost(
            id: $id
            title: $title
            description: $description
            content: $content
            category: $category
            thumbnail: $thumbnail
            isDev: $isDev
        )
    }
`;

/**
 * 게시물 삭제
 *
 * @param $id    게시물 ID
 * @param $isDev 개발중 여부
 */
export const DELETE_POST = gql`
    mutation deletePost($id: String!, $isDev: Boolean) {
        deletePost(id: $id, isDev: $isDev)
    }
`;

/**
 * 게시물 좋아요
 *
 * @param $id    게시물 ID
 * @param $isDev 개발중 여부
 */
export const LIKE_POST = gql`
    mutation likePost($id: String!, $isDev: Boolean) {
        likePost(id: $id, isDev: $isDev)
    }
`;

/**
 * 게시물 좋아요 취소
 *
 * @param $id    게시물 ID
 * @param $isDev 개발중 여부
 */
export const UNLIKE_POST = gql`
    mutation unlikePost($id: String!, $isDev: Boolean) {
        unlikePost(id: $id, isDev: $isDev)
    }
`;
