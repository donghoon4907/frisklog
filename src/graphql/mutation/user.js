import { gql } from "@apollo/client";

/**
 * 로그인
 *
 * @param $email 이메일
 */
export const SIGN_IN = gql`
    mutation logIn($email: String!) {
        logIn(email: $email) {
            token
            id
            nickname
            email
            avatar
            isMaster
        }
    }
`;

/**
 * 회원가입
 *
 * @param $email    이메일
 * @param $nickname 별칭
 * @param $avatar   프로필 사진
 */
export const SIGN_UP = gql`
    mutation addUser($email: String!, $nickname: String!, $avatar: String) {
        addUser(email: $email, nickname: $nickname, avatar: $avatar)
    }
`;
