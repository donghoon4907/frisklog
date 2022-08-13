import { gql } from "@apollo/client";

/**
 * 채팅방 추가
 *
 * @param $title  방제목
 * @param $userId 사용자 ID
 */
export const CREATE_ROOM = gql`
    mutation addRoom($title: String, $userId: String!) {
        addRoom(title: $title, userId: $userId) {
            id
        }
    }
`;
