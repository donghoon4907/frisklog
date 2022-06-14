import React from "react";
import Avatar from "./Avatar";

/**
 * 사용자 카드형 컴포넌트
 *
 * @param {string} props.userId  사용자 ID
 * @param {number} props.size    프로필 사진 크기
 * @param {string} props.src     이미지 자원
 */
const UserCardTypeItem = ({ id, nickname, avatar, PostCount }) => {
    const displayName = "fr-usercard";

    return (
        <div className={displayName}>
            <div className={`${displayName}__header`}>
                <span className="fr-avatar__name">{nickname}</span>
                <span>{PostCount} Posts</span>
            </div>
            <div className={`${displayName}__body`}>
                <Avatar userId={id} size={120} src={avatar} />
            </div>
        </div>
    );
};

export default UserCardTypeItem;
