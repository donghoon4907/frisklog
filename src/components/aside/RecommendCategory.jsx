import React from "react";

import Query from "../Query";
import { GET_RECOMMEND_CATEGORIES } from "../../graphql/query/category";
import CategoryBtn from "../button/Category";

/**
 * 추천 카테고리 컴포넌트
 *
 */
const RecommandCategory = () => (
    <ul>
        <Query
            query={GET_RECOMMEND_CATEGORIES}
            variables={{
                limit: 5
            }}
        >
            {({ data: { recommendCategories } }) =>
                recommendCategories.map(({ content, useCount }, index) => (
                    <CategoryBtn
                        key={`recommendCategory${index}`}
                        content={content}
                        count={useCount}
                        isGap={true}
                    />
                ))
            }
        </Query>
    </ul>
);

export default RecommandCategory;
