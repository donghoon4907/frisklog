import { gql } from "@apollo/client";

/**
 * * 공지사항 검색
 *
 * @query
 * @author frisk
 * @param $skip 건너뛸 목록의 수
 * @param $first 요청 목록의 수
 * @param $orderBy 정렬
 */
export const GET_NOTICES = gql`
    query GetNotices($skip: Int, $first: Int, $orderBy: String) {
        notices(skip: $skip, first: $first, orderBy: $orderBy) {
            id
            title
            description
            createdAt
            updatedAt
        }
    }
`;
