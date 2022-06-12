import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";

/**
 * popover 프로필 사진 컴포넌트
 *
 * @param props.userId  사용자 ID
 * @param props.size    프로필 사진 크기
 * @param props.src     이미지 자원
 */
const PopoverAvatar = ({ userId, nickname, size, src }) => (
    <button style={{ width: size, height: size }}>
        <div className="fr-avatar">
            <div className="fr-avatar__body">
                <OverlayTrigger
                    key={userId}
                    trigger="click"
                    placement={"bottom"}
                    overlay={
                        <Popover id={`popover${userId}`}>
                            <Popover.Header>
                                <div className="fr-popover-header__container"></div>
                                <Link to={`/user/${userId}`}>
                                    <img
                                        className="fr-popover-header__bg"
                                        src={
                                            process.env.RAZZLE_BACKEND_ROOT +
                                            (src ||
                                                process.env
                                                    .RAZZLE_DEFAULT_AVATAR)
                                        }
                                        alt="avatar"
                                    />
                                </Link>
                            </Popover.Header>
                            <Popover.Body>
                                <div className="fr-popover-body__container">
                                    <div className="fr-popover-body__username">
                                        {nickname}
                                    </div>
                                    <LogoutBtn />
                                </div>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <img
                        className="fr-avatar__image"
                        src={
                            process.env.RAZZLE_BACKEND_ROOT +
                            (src || process.env.RAZZLE_DEFAULT_AVATAR)
                        }
                        alt="avatar"
                    />
                </OverlayTrigger>
            </div>
        </div>
    </button>
);

export default PopoverAvatar;
