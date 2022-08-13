import { gql } from "@apollo/client";

import { CORE_USER_FIELDS } from "../fragment/user";

/**
 * 받은 메세지 조회
 *
 * @param $offset 건너뛸 목록의 수
 * @param $limit  요청 목록의 수
 */
export const GET_MESSAGES = gql`
    query GetMessages($offset: Int, $limit: Int!, $type: String!) {
        messages(offset: $offset, limit: $limit, type: $type) {
            nodes {
                id
                content
                readedTime
                createdAt

                from {
                    nickname
                }

                to {
                    nickname
                }
            }

            pageInfo {
                currentPage
                lastPage
                pageSize
                totalCount
            }
        }
    }
`;
