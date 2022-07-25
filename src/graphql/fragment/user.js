import { gql } from "@apollo/client";

export const CORE_USER_FIELDS = gql`
    fragment CoreUserFields on User {
        id
        nickname
        avatar
        link
        isMaster
        createdAt
        updatedAt
    }
`;

export const AUTH_USER_FIELDS = gql`
    fragment AuthUserFields on User {
        id
        nickname
        avatar
        isMaster
        token
    }
`;
