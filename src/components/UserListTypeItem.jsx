import React, { useCallback, memo, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";

import Image from "./Image";
import FollowBtn from "./button/Follow";

/**
 * 사용자 카드형 컴포넌트
 *
 * @param {number}   props.id      사용자 별명
 * @param {string}   props.nickname      사용자 별명
 * @param {number}   props.avatar        프로필 사진 파일명
 * @param {string}   props.link          링크 주소
 * @param {number}   props.Posts         작성한 포스트 수
 * @param {object[]} props.Followers     팔로워 목록
 */
const UserListTypeItem = ({ id, nickname, avatar, Posts, Followers }) => {
    const displayName = "fr-userlist";

    const history = useHistory();

    const $link = useRef(null);

    const handleClick = useCallback(
        (e) => {
            e.preventDefault();

            const isActive = $link.current.classList.contains(
                `${displayName}--active`
            );

            const searchParams = new URLSearchParams(history.location.search);

            if (isActive) {
                searchParams.delete("userId");
            } else {
                searchParams.set("userId", id);
            }

            history.push(`/follow?${searchParams.toString()}`);
        },
        [id]
    );

    return (
        <li className={`${displayName}`}>
            <NavLink
                to={`/follow?userId=${id}`}
                aria-label="사용자 포스트 보기"
                activeClassName={`${displayName}--active`}
                onClick={handleClick}
                ref={$link}
                isActive={(_, { search }) => {
                    if (search) {
                        const searchParams = new URLSearchParams(search);

                        const userId = searchParams.get("userId");

                        return id == userId;
                    }
                }}
            >
                <div className={`${displayName}__body`}>
                    <div className={`${displayName}__avatar`}>
                        <Image src={avatar} alt="Avatar" />
                    </div>
                    <div className={`${displayName}__meta`}>
                        <div className={`${displayName}__name`}>
                            <span>{nickname}</span>
                        </div>
                        <div className={`${displayName}__description`}>
                            <span>팔로워 {Followers.length}명</span>
                            <span> • </span>
                            <span>{Posts.length}개의 포스트</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <div className={`${displayName}__adjust`}>
                <FollowBtn userId={id} followers={Followers} />
            </div>
        </li>
    );
};

export default memo(UserListTypeItem);
