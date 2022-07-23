import { gql } from "@apollo/client";

/**
 * 로그인
 *
 * @param $email    이메일
 */
export const SIGN_IN = gql`
    mutation logIn($email: String!) {
        logIn(email: $email)
    }
`;

/**
 * 인증
 *
 * @param $token 인증코드
 */
export const VERIFY_TOKEN = gql`
    mutation verifyToken($email: String!, $token: String!) {
        verifyToken(email: $email, token: $token) {
            id
            nickname
            email
            avatar
            isMaster
            token
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
 * @param $nickname 별칭
 * @param $avatar   프로필 사진
 */
export const SIGN_UP = gql`
    mutation addUser($email: String!, $nickname: String!, $avatar: String) {
        addUser(email: $email, nickname: $nickname, avatar: $avatar)
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

/**
 * 팔로우
 *
 * @param $id 사용자 ID
 */
export const FOLLOW_USER = gql`
    mutation follow($id: String!) {
        follow(id: $id)
    }
`;

/**
 * 언팔로우
 *
 * @param $id 사용자 ID
 */
export const UNFOLLOW_USER = gql`
    mutation unfollow($id: String!) {
        unfollow(id: $id)
    }
`;
