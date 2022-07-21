import React from "react";

import Query from "./Query";
import Scroll from "./Scroll";
import { handleFetchMore } from "../lib/fetch";

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
            const rows = data[type];

            const rowsLen = rows.length;

            const cursor = rows[rowsLen - 1].id;

            return (
                <>
                    {rows.map((row) => (
                        <Item key={type + row.id} {...row} />
                    ))}

                    {rowsLen % variables.limit === 0 && (
                        <Scroll
                            onBottom={handleFetchMore({
                                fetchMore,
                                variables: {
                                    ...variables,
                                    cursor
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
