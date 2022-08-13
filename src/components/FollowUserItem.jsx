import React, { useCallback, memo, useRef } from "react";
import { useHistory } from "react-router-dom";

import Link from "./Link";
import FollowBtn from "./button/Follow";
import {
    displayName,
    Container,
    Body,
    Avatar,
    Meta,
    Adjust
} from "./UserListTypeItem";

/**
 * 팔로잉 유저 컴포넌트
 *
 * @param {number}   props.id      사용자 별명
 * @param {string}   props.nickname      사용자 별명
 * @param {number}   props.avatar        프로필 사진 파일명
 * @param {string}   props.link          링크 주소
 * @param {number}   props.Posts         작성한 포스트 수
 * @param {object[]} props.Followers     팔로워 목록
 */
const FollowUserItem = ({ id, nickname, avatar, Posts, Followers }) => {
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
        <Container>
            <Link
                isInternal={true}
                path={`/follow?userId=${id}`}
                ariaLabel="사용자 포스트 보기"
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
                <Body>
                    <Avatar src={avatar} />
                    <Meta nickname={nickname}>
                        <span>팔로워 {Followers.length}명</span>
                        <span> • </span>
                        <span>{Posts.length}개의 포스트</span>
                    </Meta>
                </Body>
            </Link>
            <Adjust>
                <FollowBtn userId={id} followers={Followers} />
            </Adjust>
        </Container>
    );
};

export default memo(FollowUserItem);
