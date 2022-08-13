import React, { useCallback, memo, useRef } from "react";
import { useHistory } from "react-router-dom";

import Link from "./Link";
import { displayName, Container, Body, Avatar, Meta } from "./UserListTypeItem";

/**
 * 채팅방 멤버 컴포넌트
 *
 * @param {number} props.id       사용자 ID
 * @param {string} props.nickname 사용자 별명
 * @param {string} props.avatar   프로필 사진 파일명
 * @param {number} props.roomId   채팅방 ID
 */
const RoomMemberItem = ({ nickname, avatar, status, roomId }) => {
    const history = useHistory();

    const $link = useRef(null);

    const handleClick = useCallback(
        (e) => {
            e.preventDefault();

            const $linkEl = $link.current;

            const isActive = $linkEl.classList.contains(
                `${displayName}--active`
            );

            if (!isActive) {
                history.push(`/room/${roomId}`);
            }
        },
        [roomId]
    );

    return (
        <Container>
            <Link
                isInternal={true}
                path="/"
                ariaLabel="사용자 메세지 보기"
                activeClassName={`${displayName}--active`}
                onClick={handleClick}
                ref={$link}
                isActive={(_, { pathname }) => {
                    const splitPathname = pathname.split("/");

                    const id = splitPathname[splitPathname.length - 1];

                    return id == roomId;
                }}
            >
                <Body>
                    <Avatar src={avatar} status={status} />
                    <Meta nickname={nickname} />
                </Body>
            </Link>
        </Container>
    );
};

export default memo(RoomMemberItem);
