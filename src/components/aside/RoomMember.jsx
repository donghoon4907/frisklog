import React, { useState, useCallback, memo } from "react";
import { useHistory } from "react-router-dom";

import Query from "../Query";
import { GET_ROOMS } from "../../graphql/query/room";
import RoomMemberItem from "../RoomMemberItem";
import Button from "../button";
import { FormInput } from "../Form";
import { useInput } from "../../hooks";

/**
 * 팔로잉 사용자 컴포넌트
 *
 */
const RoomMember = () => {
    return (
        <Query
            query={GET_ROOMS}
            fetchPolicy="network-only"
            variables={{
                limit: 10
            }}
        >
            {({ data: { rooms } }) => (
                <ul>
                    {rooms.map((room, idx) => (
                        <RoomMemberItem
                            key={`roomMemberItem${idx}`}
                            {...room.Partner}
                            roomId={room.id}
                        />
                    ))}
                </ul>
            )}
        </Query>
    );
};

export default memo(RoomMember);
