import { gql } from "@apollo/client";

/**
 * 사용자 검색
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 * @param $order  정렬
 */
export const GET_USERS = gql`
    query GetUsers($offset: Int, $limit: Int!, $order: String) {
        users(offset: $offset, limit: $limit, order: $order) {
            rows {
                id
                nickname
                email
                avatar
                isMaster
                Posts {
                    id
                }
                createdAt
                updatedAt
            }
            count
        }
    }
`;

/**
 * 추천인 검색
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 * @param $order  정렬
 */
export const GET_RECOMMENDERS = gql`
    query GetRecommenders($offset: Int, $limit: Int!) {
        recommenders(offset: $offset, limit: $limit) {
            id
            nickname
            avatar
            PlatformId
            link
            storageUrl
            postCount
        }
    }
`;

/**
 * 사용자 상세 조회
 *
 * @param $id 사용자 ID
 */
export const GET_USER = gql`
    query GetUser($id: String!) {
        user(id: $id) {
            id
            nickname
            email
            avatar
            isMaster
            Posts {
                id
            }
            createdAt
            updatedAt
        }
    }
`;

/**
 * 내 정보
 *
 * @query
 * @author frisk
 */
export const ME = gql`
    query Me {
        me {
            id
            nickname
            email
            avatar
            isMaster
            Posts {
                id
            }
            createdAt
            updatedAt
        }
    }
`;
