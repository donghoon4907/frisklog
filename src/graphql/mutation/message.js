import { gql } from "@apollo/client";

/**
 * 메세지 추가
 *
 * @param $receivers 메세지 받을 사용자 목록
 */
export const SEND_MESSAGES = gql`
    mutation sendMessages($receivers: [ID], $content: String!) {
        sendMessages(receivers: $receivers, content: $content)
    }
`;

/**
 * 메세지 삭제
 *
 * @param $messages 삭제할 메세지 목록
 */
export const DELETE_MESSAGES = gql`
    mutation deleteMessages($messages: [ID]) {
        deleteMessages(messages: $messages)
    }
`;
