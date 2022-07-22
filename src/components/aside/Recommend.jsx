import React from "react";

import RecommendUser from "./RecommendUser";
import RecommendCategory from "./RecommendCategory";

/**
 * 추천 컨텐츠 컴포넌트
 *
 */
const AsideRecommand = () => {
    const displayName = "fr-recommend";

    return (
        <div className={`${displayName}__wrapper`}>
            <div className={`${displayName}__title`}>
                <h2>추천인</h2>
            </div>
            <RecommendUser />
            <br />
            <div className={`${displayName}__title`}>
                <h2>추천 카테고리</h2>
            </div>
            <RecommendCategory />
        </div>
    );
};

export default AsideRecommand;
