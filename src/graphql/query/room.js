import { gql } from "@apollo/client";

import { CORE_USER_FIELDS } from "../fragment/user";

/**
 * 추천카테고리 검색
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 */
export const GET_ROOMS = gql`
    ${CORE_USER_FIELDS}
    query GetRooms($offset: Int, $limit: Int!) {
        rooms(offset: $offset, limit: $limit) {
            id
            title
            createdAt

            Partner {
                ...CoreUserFields
            }
        }
    }
`;

/**
 * 추천카테고리 검색
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 */
export const GET_ROOM = gql`
    ${CORE_USER_FIELDS}
    query GetRoom($id: String) {
        room(id: $id) {
            id
            title
            createdAt

            Partner {
                ...CoreUserFields
            }
        }
    }
`;
