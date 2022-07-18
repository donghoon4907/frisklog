import React, { memo } from "react";
import Link from "./Link";

/**
 * 프로필 사진 컴포넌트
 *
 * @param {number} props.size        프로필 사진 크기
 * @param {number} props.ariaLabel   aria-label
 * @param {string} props.domainUrl   도메인 경로
 * @param {string} props.path        파일 경로
 * @param {string} props.storageUrl  저장소 경로
 * @param {string} props.src         이미지 경로
 * @param {string} props.isExternal  인사이트 여부
 */
const Avatar = ({
    size,
    ariaLabel,
    domainUrl,
    path,
    storageUrl,
    src,
    isInternal
}) => {
    const displayName = "fr-avatar";

    return (
        <Link
            path={path}
            domainUrl={domainUrl}
            isInternal={isInternal}
            aria-label={ariaLabel}
        >
            <div style={{ width: size, height: size }}>
                <div className={displayName}>
                    <div className={`${displayName}__body`}>
                        <img
                            className={`${displayName}__image`}
                            src={
                                storageUrl +
                                (src || process.env.RAZZLE_DEFAULT_AVATAR)
                            }
                            alt="avatar"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default memo(Avatar);
