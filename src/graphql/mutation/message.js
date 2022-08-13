import { gql } from "@apollo/client";

/**
 * 메세지 추가
 *
 * @param $roomId  채팅방 ID
 * @param $content 내용
 */
export const SEND_MESSAGE = gql`
    mutation sendMessage($to: ID!, $content: String!) {
        sendMessage(to: $to, content: $content) {
            id
        }
    }
`;
