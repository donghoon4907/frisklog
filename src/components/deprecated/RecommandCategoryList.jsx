import React, { memo } from "react";
import { GET_CATEGORIES } from "../../graphql/query/category";
import Query from "../Query";
import RecommandCategoryItem from "./RecommandCategoryItem";

/**
 * 추천 카테고리 목록 컴포넌트
 *
 * @Component
 * @author frisk
 */
const RecommandCategoryList = () => (
    <ul>
        <Query
            query={GET_CATEGORIES}
            variables={{
                first: 3,
                orderBy: "useCount_DESC"
            }}
        >
            {({ data: { categories } }) =>
                categories.map((category) => (
                    <RecommandCategoryItem key={category.id} {...category} />
                ))
            }
        </Query>
    </ul>
);

export default memo(RecommandCategoryList);
