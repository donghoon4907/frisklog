import React from "react";
import { Helmet } from "react-helmet";

const DEFAULT_TITLE = "Frisklog";

const DEFAULT_DESCRIPTION =
    "Frisklog는 소셜네트워크 블로그 서비스입니다. 최신 포스트와 추천인의 포스트를 살펴보세요.";

const DEFAULT_URL = "http://frisklog.site";
/**
 * 메타 컴포넌트
 *
 */
const Meta = ({ title, description, url }) => {
    return (
        <Helmet>
            <title>{title || DEFAULT_TITLE}</title>
            <meta property="og:title" content={title || DEFAULT_TITLE} />
            <meta
                name="description"
                content={description || DEFAULT_DESCRIPTION}
            />
            <meta
                property="og:description"
                content={description || DEFAULT_DESCRIPTION}
            />
            <meta property="og:url" content={DEFAULT_URL + (url || "")} />
            {/* <script src="https://accounts.google.com/gsi/client" async defer /> */}
        </Helmet>
    );
};

export default Meta;
