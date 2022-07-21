import React from "react";

import Query from "./Query";
import { GET_RECOMMENDERS } from "../graphql/query/user";
import UserCardTypeItem from "./UserCardTypeItem";
import Carousel from "./Carousel";

/**
 * 추천 사용자 컴포넌트
 *
 */
const RecommendUser = () => (
    <Query
        query={GET_RECOMMENDERS}
        variables={{
            limit: 10
        }}
    >
        {({ data: { recommenders } }) => {
            if (recommenders.length === 0) {
                return null;
            }

            return (
                <Carousel>
                    {recommenders.map((user) => (
                        <UserCardTypeItem key={`user${user.id}`} {...user} />
                    ))}
                </Carousel>
            );
        }}
    </Query>
);

export default RecommendUser;
