import { gql } from "@apollo/client";

/**
 * * 카테고리 검색
 *
 * @query
 * @author frisk
 * @param $skip 건너뛸 목록의 수
 * @param $first 요청 목록의 수
 * @param $orderBy 정렬
 */
export const GET_CATEGORIES = gql`
    query GetCategories($skip: Int, $first: Int, $orderBy: String) {
        categories(skip: $skip, first: $first, orderBy: $orderBy) {
            id
            content
            useCount
        }
    }
`;
