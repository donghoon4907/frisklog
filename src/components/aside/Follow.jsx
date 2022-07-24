import React from "react";

import FollowingUser from "./FollowingUser";
import { useSelector } from "../../context";

/**
 *  팔로우 컨텐츠 컴포넌트
 *
 */
const AsideFollow = () => {
    const displayName = "fr-recommend";

    const { id } = useSelector();

    if (id === null) {
        return null;
    }

    return (
        <div className={`${displayName}__wrapper`}>
            <div className={`${displayName}__title`}>
                <h2>팔로잉 목록</h2>
            </div>
            <FollowingUser userId={id.toString()} />
        </div>
    );
};

export default AsideFollow;
