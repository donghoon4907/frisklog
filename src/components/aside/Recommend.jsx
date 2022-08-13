import React from "react";

import RecommendUser from "./RecommendUser";
import RecommendCategory from "./RecommendCategory";

/**
 * 추천 컨텐츠 컴포넌트
 *
 */
const AsideRecommand = () => (
    <>
        <div className="fr-aside__title">
            <h2>추천인</h2>
        </div>
        <RecommendUser />
        <br />
        <div className="fr-aside__title">
            <h2>추천 카테고리</h2>
        </div>
        <RecommendCategory />
    </>
);

export default AsideRecommand;
