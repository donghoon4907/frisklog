import { gql } from "@apollo/client";

import { AUTH_USER_FIELDS } from "../fragment/user";

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
 * @param $email
 * @param $token 인증코드
 * @param $keep  로그인 유지 여부
 */
export const VERIFY_TOKEN = gql`
    ${AUTH_USER_FIELDS}
    mutation verifyToken($email: String!, $token: String!, $keep: Boolean!) {
        verifyToken(email: $email, token: $token, keep: $keep) {
            ...AuthUserFields
        }
    }
`;

/**
 * 구글 로그인
 *
 * @param $email   이메일
 */
export const SIGN_IN_GOOGLE = gql`
    ${AUTH_USER_FIELDS}
    mutation logInWithGoogle($email: String!, $nickname: String!) {
        logInWithGoogle(email: $email, nickname: $nickname) {
            ...AuthUserFields
        }
    }
`;

/**
 * Github 로그인
 *
 * @param $code   이메일
 */
export const SIGN_IN_GITHUB = gql`
    ${AUTH_USER_FIELDS}
    mutation logInWithGithub($code: String!) {
        logInWithGithub(code: $code) {
            ...AuthUserFields
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
 * @param $nickname 별칭
 * @param $avatar   프로필 사진
 */
export const UPDATE_USER = gql`
    ${AUTH_USER_FIELDS}
    mutation updateUser($nickname: String, $avatar: String) {
        updateUser(nickname: $nickname, avatar: $avatar) {
            ...AuthUserFields
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
