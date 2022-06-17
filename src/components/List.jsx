import React from "react";
import Query from "./Query";
import Scroll from "./Scroll";
import { handleFetchMore } from "../lib/fetch";

/**
 * 공통 리스트 렌더링 컴포넌트
 *
 * @param {string}          type          데이터 키
 * @param {string}          query         요청 쿼리
 * @param {object}          variables     요청 쿼리 파라미터
 * @param {string}          fetchMoreType @enum scroll | button
 * @param {React.Component} Item          렌더링 컴포넌트
 */
const List = ({ type, query, variables, fetchMoreType, Item }) => (
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

                    {len < count &&
                        ((fetchMoreType === "scroll" && (
                            <Scroll
                                onBottom={handleFetchMore({
                                    fetchMore,
                                    variables: {
                                        ...variables,
                                        offset: len
                                    },
                                    type
                                })}
                            />
                        )) ||
                            (fetchMoreType === "button" && null))}
                </>
            );
        }}
    </Query>
);

export default List;
