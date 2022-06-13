import { gql } from "@apollo/client";

/**
 * * 공지사항 추가
 *
 * @mutation
 * @author frisk
 * @param $title 제목
 * @param $description 내용
 */
export const CREATE_NOTICE = gql`
    mutation createNotice($title: String!, $description: String!) {
        createNotice(title: $title, description: $description)
    }
`;

/**
 * * 공지사항 수정
 *
 * @mutation
 * @author frisk
 * @param $id 공지사항 ID
 * @param $title 제목
 * @param $description 내용
 */
export const UPDATE_NOTICE = gql`
    mutation updateNotice(
        $id: String!
        $title: String!
        $description: String!
    ) {
        updateNotice(id: $id, title: $title, description: $description)
    }
`;

/**
 * * 공지사항 삭제
 *
 * @mutation
 * @author frisk
 * @param $id 공지사항 ID
 */
export const DELETE_NOTICE = gql`
    mutation deleteNotice($id: String!) {
        deleteNotice(id: $id)
    }
`;
