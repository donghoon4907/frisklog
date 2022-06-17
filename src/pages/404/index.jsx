import React from "react";
import Meta from "../../components/Meta";
import BtnLink from "../../components/button/BtnLink";

/**
 * * 404 화면 컴포넌트
 *
 * @author frist
 */
const ErrorPage = () => {
    const displayName = "fr-404";

    return (
        <div className={displayName}>
            <Meta
                title="페이지를 찾을 수 없습니다."
                description="page is not found in frisklog"
            />
            <div className={`${displayName}__body`}>
                <h1>페이지를 찾을 수 없습니다.</h1>
                <p className={`${displayName}__description`}>404, Not Found</p>
                <div className={`${displayName}__submit`}>
                    <BtnLink to="/">돌아가기</BtnLink>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
