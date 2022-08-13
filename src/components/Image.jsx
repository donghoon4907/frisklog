import React, { memo } from "react";

import { Thumbnail } from "../assets/icon";
import { Badge } from "./Status";

/**
 * 이미지 컴포넌트
 *
 * @param {string}  props.src      이미지 자원
 * @param {string}  props.alt      이미지 대체자
 * @param {string}  props.status   사용자 상태
 * @param {boolean} props.isUpload 업로드 사용 여부
 */
const Image = ({ src, alt, status, isUpload }) => {
    const displayName = "fr-image";

    return (
        <div className={`${displayName}__wrapper`}>
            {src && (
                <img
                    className={`${displayName} ${
                        isUpload ? `${displayName}--upload` : ""
                    }`}
                    src={src}
                    alt={alt}
                    aria-hidden="true"
                />
            )}
            {status && (
                <div className={`${displayName}__status`}>
                    <Badge status={status} />
                </div>
            )}

            {isUpload && (
                <div className={`${displayName}__background`}>
                    <Thumbnail style={{ width: 100, height: 50 }} />
                </div>
            )}
        </div>
    );
};

export default memo(Image);
