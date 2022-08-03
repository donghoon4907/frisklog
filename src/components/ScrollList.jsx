import React from "react";

import Query from "./Query";
import Scroll from "./Scroll";
import { fetchThen } from "../lib/fetch";

/**
 * 공통 리스트 렌더링 컴포넌트
 *
 * @param {string}          type          데이터 키
 * @param {string}          query
 * @param {object}          variables
 * @param {string}          fetchPolicy
 * @param {React.Component} Item          렌더링 컴포넌트
 */
const List = ({ type, Item, variables, ...props }) => (
    <Query variables={variables} {...props}>
        {({ data, fetchMore }) => {
            const query = data[type];

            const { totalCount, edges, pageInfo } = query;

            if (totalCount === 0) {
                return null;
            }

            const nodes = edges.map((edge) => edge.node);

            return (
                <>
                    {nodes.map((node) => (
                        <Item key={type + node.id} {...node} />
                    ))}

                    {pageInfo.hasNextPage && (
                        <Scroll
                            onBottom={fetchThen(fetchMore, {
                                variables: {
                                    ...variables,
                                    cursor: pageInfo.endCursor
                                },
                                type
                            })}
                        />
                    )}
                </>
            );
        }}
    </Query>
);

export default List;
