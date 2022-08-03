import { gql } from "@apollo/client";

/**
 * 추천카테고리 검색
 *
 * @param $limit  요청 목록의 수
 */
export const GET_RECOMMEND_CATEGORIES = gql`
    query GetRecommendCategories($limit: Int!) {
        recommendCategories(limit: $limit) {
            content
            useCount
        }
    }
`;
