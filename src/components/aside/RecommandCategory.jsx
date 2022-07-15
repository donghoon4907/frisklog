import React from "react";
import Query from "../Query";
import { GET_RECOMMEND_CATEGORIES } from "../../graphql/query/post";
import CategoryBtn from "../button/Category";

/**
 * 추천 카테고리 컴포넌트
 *
 */
const AsideRecommandCategory = () => {
    const displayName = "fr-recommend";

    return (
        <div className={`${displayName}__wrapper`}>
            <div className={`${displayName}__title`}>추천 카테고리</div>
            <ul className={displayName} aria-label="추천 카테고리">
                <Query
                    query={GET_RECOMMEND_CATEGORIES}
                    variables={{
                        limit: 5
                    }}
                >
                    {({ data: { recommendCategories } }) =>
                        recommendCategories.map(({ category, searchCount }) => (
                            <CategoryBtn
                                key={`recCat${category}`}
                                content={category}
                                count={searchCount}
                                isGap={true}
                            />
                        ))
                    }
                </Query>
            </ul>
        </div>
    );
};

export default AsideRecommandCategory;
