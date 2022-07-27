import { gql } from "@apollo/client";

export const CORE_PLATFORM_FIELDS = gql`
    fragment CorePlatformFields on Platform {
        id
        platformName
        logoUrl
        domainUrl
    }
`;
