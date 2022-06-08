import React, { useState, useRef, useCallback, memo } from "react";
import { Overlay } from "react-bootstrap";
import { useSelector } from "../context";
import Avatar from "./Avatar";

/**
 * 추천 사용자 컴포넌트
 *
 * @param props.id        사용자 ID
 * @param props.avatar    사용자 프로필 사진
 * @param props.nickname  사용자 별칭
 * @param props.Posts     사용자 포스트 목록
 *
 */
const RecommandUserItem = ({ id, avatar, nickname, Posts }) => {
    const displayName = "fr-user";
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { isCollapseNav } = useSelector();
    /**
     * 튤팁 보이기 상태 모듈 활성화
     */
    const [show, setShow] = useState(false);
    /**
     * avatar element
     */
    const $avatar = useRef(null);
    /**
     * 프로필 사진 mouse enter 핸들러
     */
    const handleEnterAvatar = useCallback(() => {
        if (isCollapseNav === "contract") {
            setShow(true);
        }
    }, [isCollapseNav]);
    /**
     * 프로필 사진 mouse leave 핸들러
     */
    const handleLeaveAvatar = useCallback(() => {
        if (isCollapseNav === "contract") {
            setShow(false);
        }
    }, [isCollapseNav]);

    return (
        <li className={`${displayName}`}>
            <div
                className={`${displayName}__avatar-wrapper`}
                ref={$avatar}
                onMouseEnter={handleEnterAvatar}
                onMouseLeave={handleLeaveAvatar}
            >
                <Avatar size="45" src={avatar} userId={id} />
            </div>
            {isCollapseNav === "expand" && (
                <div className={`${displayName}__name-wrapper`}>
                    <p className={`${displayName}__name`}>{nickname}</p>
                    <em>{Posts.length} posts</em>
                </div>
            )}
            <Overlay target={$avatar.current} show={show} placement="right">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            backgroundColor: "white",
                            padding: "2px 10px",
                            borderRadius: 3,
                            zIndex: 3,
                            left: 12,
                            boxShadow:
                                "0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <div>
                            <p className={`${displayName}__name`}>{nickname}</p>
                            <em>{Posts.length} posts</em>
                        </div>
                    </div>
                )}
            </Overlay>
        </li>
    );
};

export default memo(RecommandUserItem);
