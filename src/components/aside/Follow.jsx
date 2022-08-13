import React from "react";

import FollowingUser from "./FollowingUser";
import { useSelector } from "../../context";

/**
 *  팔로우 컨텐츠 컴포넌트
 *
 */
const AsideFollow = () => {
    const { id } = useSelector();

    if (id === null) {
        return null;
    }

    return (
        <>
            <div className="fr-aside__title">
                <h2>팔로잉 목록</h2>
            </div>
            <FollowingUser userId={id.toString()} />
        </>
    );
};

export default AsideFollow;
