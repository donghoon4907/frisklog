import React from "react";
import { Link } from "react-router-dom";

/**
 * * 공통 프로필 사진 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.userId  사용자 ID
 * @param props.size    프로필 사진 크기
 * @param props.src     이미지 자원
 */
const Avatar = ({ userId, size, src }) => (
    <Link className="fr-avatar" to={`/user/${userId}`}>
        <img
            src={
                process.env.RAZZLE_BACKEND_ROOT +
                (src || process.env.RAZZLE_DEFAULT_AVATAR)
            }
            alt="avatar"
            width={size}
            height={size}
        />
    </Link>
);

export default Avatar;
