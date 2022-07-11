import { gql } from "@apollo/client";

/**
 * 로그인
 *
 * @param $email    이메일
 * @param $password 암호
 */
export const SIGN_IN = gql`
    mutation logIn($email: String!, $password: String!) {
        logIn(email: $email, password: $password) {
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
 * 구글 로그인
 *
 * @param $email   이메일
 */
export const SIGN_IN_GOOGLE = gql`
    mutation logInWithGoogle($email: String!, $nickname: String!) {
        logInWithGoogle(email: $email, nickname: $nickname) {
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
 * @param $password 암호
 * @param $nickname 별칭
 * @param $avatar   프로필 사진
 */
export const SIGN_UP = gql`
    mutation addUser(
        $email: String!
        $password: String!
        $nickname: String!
        $avatar: String
    ) {
        addUser(
            email: $email
            password: $password
            nickname: $nickname
            avatar: $avatar
        )
    }
`;

/**
 * 사용자 정보 업데이트
 *
 * @param $password 암호
 * @param $nickname 별칭
 * @param $avatar   프로필 사진
 */
export const UPDATE_USER = gql`
    mutation updateUser($password: String, $nickname: String, $avatar: String) {
        updateUser(password: $password, nickname: $nickname, avatar: $avatar) {
            token
            id
            nickname
            email
            avatar
            isMaster
        }
    }
`;
