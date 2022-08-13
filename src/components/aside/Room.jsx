import React from "react";

import RoomMember from "./RoomMember";

/**
 *  팔로우 컨텐츠 컴포넌트
 *
 */
const AsideRoom = ({
    match: {
        params: { id }
    }
}) => {
    return (
        <>
            <div className="fr-aside__title">
                <h2>메세지 목록</h2>
            </div>
            <RoomMember />
        </>
    );
};

export default AsideRoom;
