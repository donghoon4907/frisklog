import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

/**
 * popover 프로필 사진 컴포넌트
 *
 * @param props.userId  사용자 ID
 * @param props.size    프로필 사진 크기
 * @param props.src     이미지 자원
 */
const PopoverAvatar = ({ userId, size, src }) => (
    <div className="fr-avatar">
        <OverlayTrigger
            key={userId}
            trigger="click"
            placement={"bottom"}
            overlay={
                <Popover id={`popover${userId}`}>
                    <Popover.Header>
                        <div style={{ width: 200, height: 120 }}></div>
                        <img
                            src={
                                process.env.RAZZLE_BACKEND_ROOT +
                                (src || process.env.RAZZLE_DEFAULT_AVATAR)
                            }
                            alt="avatar"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: 120
                            }}
                        />
                    </Popover.Header>
                    <Popover.Body>
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ width: 200, height: 40 }}
                        >
                            <div style={{ marginRight: 70 }}>username</div>
                            <button className="fr-btn fr-link">로그아웃</button>
                        </div>
                    </Popover.Body>
                </Popover>
            }
        >
            <img
                src={
                    process.env.RAZZLE_BACKEND_ROOT +
                    (src || process.env.RAZZLE_DEFAULT_AVATAR)
                }
                alt="avatar"
                width={size}
                height={size}
            />
        </OverlayTrigger>
    </div>
);

export default PopoverAvatar;
