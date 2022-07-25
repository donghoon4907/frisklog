import { gql } from "@apollo/client";

import { CORE_USER_FIELDS } from "../fragment/user";

/**
 * 사용자 검색
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 * @param $order  정렬
 * @deprecated
 */
export const GET_USERS = gql`
    query GetUsers($offset: Int, $limit: Int!, $order: String) {
        users(offset: $offset, limit: $limit, order: $order) {
            rows {
                id
                nickname
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
 * @param $cursor 커서
 * @param $limit  요청 목록의 수
 */
export const GET_RECOMMENDERS = gql`
    ${CORE_USER_FIELDS}
    query GetRecommenders($cursor: String, $limit: Int!) {
        recommenders(cursor: $cursor, limit: $limit) {
            ...CoreUserFields

            postCount

            Platform {
                id
                storageUrl
            }

            Followers {
                id
            }
        }
    }
`;

/**
 * 사용자 상세 조회
 *
 * @param $id 사용자 ID
 */
export const GET_USER = gql`
    ${CORE_USER_FIELDS}
    query GetUser($id: String!) {
        user(id: $id) {
            ...CoreUserFields

            Posts {
                id
            }

            Followers {
                id
            }
        }
    }
`;

/**
 * 팔로잉 검색
 *
 * @param $cursor 커서
 * @param $limit  요청 목록의 수
 * @param $userId 사용자 ID
 */
export const GET_FOLLOWINGS = gql`
    ${CORE_USER_FIELDS}
    query GetFollowings($cursor: String, $limit: Int!, $userId: String!) {
        followings(cursor: $cursor, limit: $limit, userId: $userId) {
            ...CoreUserFields

            Platform {
                id
                storageUrl
            }
        }
    }
`;
