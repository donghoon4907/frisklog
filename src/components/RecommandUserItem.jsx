import React, { useState, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import { Overlay } from "react-bootstrap";
import { useSelector } from "../context";
import Avatar from "./Avatar";

const Container = styled.div`
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    gap: 5px;
`;

const AvatarWrapper = styled.div`
    width: 50px;
`;

const Title = styled.div`
    width: 150px;
    font-weight: 500;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
`;

const SubTitle = styled.div`
    font-size: 13px;
`;

/**
 * * 추천 사용자 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.id        사용자 ID
 * @param props.avatar    사용자 프로필 사진
 * @param props.nickname  사용자 별칭
 * @param props.postCount 사용자 포스트 수
 *
 */
const RecommandUserItem = ({ id, avatar, nickname, postCount }) => {
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
        <Container>
            <AvatarWrapper
                ref={$avatar}
                onMouseEnter={handleEnterAvatar}
                onMouseLeave={handleLeaveAvatar}
            >
                <Avatar size="45" src={avatar.url} userId={id} />
            </AvatarWrapper>
            {isCollapseNav === "expand" && (
                <div>
                    <Title>{nickname}</Title>
                    <SubTitle>{postCount} posts</SubTitle>
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
                            <Title>{nickname}</Title>
                            <SubTitle>{postCount} posts</SubTitle>
                        </div>
                    </div>
                )}
            </Overlay>
        </Container>
    );
};

export default memo(RecommandUserItem);
