import { gql } from "@apollo/client";

/**
 * 추천인 검색
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 */
export const GET_RECOMMEND_CATEGORIES = gql`
    query GetRecommendCategories($offset: Int, $limit: Int!) {
        recommendCategories(offset: $offset, limit: $limit) {
            category
            searchCount
        }
    }
`;
