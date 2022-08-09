import React, { memo } from "react";

import FollowBtn from "./button/Follow";
import LinkImage from "./LinkImage";
import { useSelector } from "../context";

/**
 * 사용자 카드형 컴포넌트
 *
 * @param {string}   props.id        사용자 ID
 * @param {string}   props.nickname  사용자 별명
 * @param {number}   props.avatar    프로필 사진 파일명
 * @param {string}   props.link      링크 주소
 * @param {number}   props.postCount 작성한 포스트 수
 */
const UserCardTypeItem = ({ nickname, avatar, link, postCount }) => {
    const displayName = "fr-usercard";

    return (
        <div className={displayName}>
            <div className={`${displayName}__header`}>
                <span className="fr-avatar__name">{nickname}</span>
                <span>{postCount.toLocaleString()} Posts</span>
            </div>
            <div className={`${displayName}__body`} title="사용자 링크">
                <div className={`${displayName}__avatar`}>
                    <LinkImage
                        ariaLabel="사용자 페이지로 이동"
                        path={link}
                        src={avatar}
                        alt="Avatar"
                        isInternal={true}
                        tabIndex="-1"
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(UserCardTypeItem);
