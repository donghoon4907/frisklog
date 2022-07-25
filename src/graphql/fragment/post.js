import { gql } from "@apollo/client";

export const CORE_POST_FIELDS = gql`
    fragment CorePostFields on Post {
        id
        content
        createdAt
        updatedAt
    }
`;
