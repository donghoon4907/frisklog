import React, { memo } from "react";

import Query from "../Query";
import { GET_FOLLOWINGS } from "../../graphql/query/user";
import UserCardTypeItem from "../UserCardTypeItem";
import Carousel from "../Carousel";

/**
 * 팔로잉 사용자 컴포넌트
 *
 */
const FollowingUser = ({ userId }) => (
    <Query
        query={GET_FOLLOWINGS}
        fetchPolicy="cache-and-network"
        variables={{
            limit: 5,
            userId
        }}
    >
        {({ data: { followings } }) => {
            if (followings.length === 0) {
                return null;
            }

            return (
                <Carousel>
                    {followings.map((user) => (
                        <UserCardTypeItem key={`user${user.id}`} {...user} />
                    ))}
                </Carousel>
            );
        }}
    </Query>
);

export default memo(FollowingUser);
