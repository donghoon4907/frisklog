import { gql } from "@apollo/client";

export const CORE_COMMENT_FIELDS = gql`
    fragment CoreCommentFields on Comment {
        id
        content
        createdAt
        updatedAt
    }
`;
