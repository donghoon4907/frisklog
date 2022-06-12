import React from "react";
import { Link } from "react-router-dom";

/**
 * 프로필 사진 컴포넌트
 *
 * @param {string} props.userId  사용자 ID
 * @param {number} props.size    프로필 사진 크기
 * @param {string} props.src     이미지 자원
 */
const Avatar = ({ userId, size, src }) => (
    <Link to={`/user/${userId}`}>
        <div style={{ width: size, height: size }}>
            <div className="fr-avatar">
                <div className="fr-avatar__body">
                    <img
                        className="fr-avatar__image"
                        src={
                            process.env.RAZZLE_BACKEND_ROOT +
                            (src || process.env.RAZZLE_DEFAULT_AVATAR)
                        }
                        alt="avatar"
                    />
                </div>
            </div>
        </div>
    </Link>
);

export default Avatar;
