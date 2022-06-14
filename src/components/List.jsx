import React from "react";
import Query from "./Query";
import Scroll from "./Scroll";

/**
 * 공통 리스트 렌더링 컴포넌트
 *
 * @param {string}          type      데이터 키
 * @param {string}          query     요청 쿼리
 * @param {object}          variables 요청 쿼리 파라미터
 * @param {React.Component} Item      렌더링 컴포넌트
 */
const List = ({ type, query, variables, Item }) => (
    <Query query={query} variables={variables}>
        {({ data, fetchMore }) => {
            const { rows, count } = data[type];

            const len = rows.length;

            if (len === 0) {
                return "no data";
            }

            return (
                <>
                    {rows.map((row) => (
                        <Item key={type + row.id} {...row} />
                    ))}

                    {len < count && (
                        <Scroll
                            onBottom={(activeEvent) => {
                                fetchMore({
                                    variables: {
                                        ...variables,
                                        offset: len
                                    },
                                    updateQuery: (prev, next) => {
                                        const { fetchMoreResult } = next;

                                        if (!fetchMoreResult) {
                                            return prev;
                                        }

                                        activeEvent();

                                        return {
                                            [type]: {
                                                rows: [
                                                    ...prev[type].rows,
                                                    ...fetchMoreResult[type]
                                                        .rows
                                                ],
                                                count
                                            }
                                        };
                                    }
                                });
                            }}
                        />
                    )}
                </>
            );
        }}
    </Query>
);

export default List;
