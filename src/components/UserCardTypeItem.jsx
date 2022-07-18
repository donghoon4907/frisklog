import React from "react";
import Avatar from "./Avatar";

/**
 * 사용자 카드형 컴포넌트
 *
 * @param {string} props.nickname   사용자 별명
 * @param {number} props.avatar     프로필 사진 파일명
 * @param {string} props.storageUrl 저장소 경로
 * @param {string} props.link       링크 주소
 * @param {number} props.postCount  작성한 포스트 수
 */
const UserCardTypeItem = ({
    nickname,
    avatar,
    storageUrl,
    link,
    postCount
}) => {
    const displayName = "fr-usercard";

    return (
        <div className={displayName}>
            <div className={`${displayName}__header`}>
                <span className="fr-avatar__name">{nickname}</span>
                <span>{postCount} Posts</span>
            </div>
            <div className={`${displayName}__body`} title="Avatar">
                <Avatar
                    ariaLabel="Avatar"
                    path={link}
                    size={120}
                    domainUrl={""}
                    storageUrl={storageUrl}
                    src={avatar}
                    isInternal={true}
                />
            </div>
        </div>
    );
};

export default UserCardTypeItem;
