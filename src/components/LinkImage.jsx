import React from "react";

import Link from "./Link";
import Image from "./Image";

/**
 * 프로필 사진 컴포넌트
 *
 *
 * @param {number}  props.ariaLabel  aria-label
 * @param {string}  props.domainUrl  도메인 경로
 * @param {string}  props.path       파일 경로
 * @param {string}  props.src        이미지 자원
 * @param {string}  props.alt        이미지 대체자
 * @param {boolean} props.isInternal 외부 사이트 여부
 * @param {boolean} props.tabIndex   tab-index
 */
const LinkImage = ({ path, src, alt, domainUrl, ...props }) => (
    <Link path={path} domainUrl={domainUrl} {...props}>
        <Image src={src} alt={alt} />
    </Link>
);

export default LinkImage;
