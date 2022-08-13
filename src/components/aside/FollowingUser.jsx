import React, { useState, useCallback, memo } from "react";
import { useHistory } from "react-router-dom";

import Query from "../Query";
import { GET_FOLLOWINGS } from "../../graphql/query/user";
import FollowUserItem from "../FollowUserItem";
import Button from "../button";
import { FormInput } from "../Form";
import { useInput } from "../../hooks";

/**
 * 팔로잉 사용자 컴포넌트
 *
 */
const FollowingUser = () => {
    const displayName = "fr-following";

    const history = useHistory();

    const searchParams = new URLSearchParams(history.location.search);

    const searchKeyword = searchParams.get("search") || "";

    const [before, setBefore] = useState("");

    const [after, setAfter] = useState("");

    const search = useInput(searchKeyword);

    const [nickname, setNickname] = useState(searchKeyword);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const searchParams = new URLSearchParams(history.location.search);

            if (searchParams.has("userId")) {
                searchParams.delete("userId");
            }

            searchParams.set("search", search.value);

            history.push(`/follow?${searchParams.toString()}`);

            setNickname(search.value);
        },
        [search.value]
    );

    const handlePrevious = useCallback((cursor) => {
        setBefore(cursor);

        setAfter("");
    }, []);

    const handleNext = useCallback((cursor) => {
        setAfter(cursor);

        setBefore("");
    }, []);

    return (
        <Query
            query={GET_FOLLOWINGS}
            fetchPolicy="no-cache"
            variables={{
                limit: 3,
                before,
                after,
                nickname
            }}
        >
            {({ data: { followings } }) => {
                const { totalCount, edges, pageInfo } = followings;

                const nodes = edges.map((edge) => edge.node);

                const {
                    hasPreviousPage,
                    hasNextPage,
                    startCursor,
                    endCursor
                } = pageInfo;

                return (
                    <div className={`${displayName}__wrapper`}>
                        <header className={`${displayName}__header`}>
                            <div className={`${displayName}__column`}>
                                <form onSubmit={handleSubmit}>
                                    <div className={`${displayName}__input`}>
                                        <FormInput
                                            placeholder="검색어를 입력하세요"
                                            id="followingSearch"
                                            autoComplete="off"
                                            required
                                            label="검색어"
                                            {...search}
                                        >
                                            <div
                                                className={`${displayName}__button`}
                                            >
                                                <Button
                                                    type="submit"
                                                    className="fr-btn--primary"
                                                >
                                                    검색
                                                </Button>
                                            </div>
                                        </FormInput>
                                    </div>
                                </form>
                            </div>
                        </header>
                        <ul className="fr-following">
                            {totalCount === 0 && (
                                <li className={`${displayName}__empty`}>
                                    검색 결과가 없습니다.
                                </li>
                            )}
                            {nodes.map((user, idx) => (
                                <FollowUserItem
                                    key={`followItem${idx}`}
                                    {...user}
                                />
                            ))}
                        </ul>
                        <footer className={`${displayName}__footer`}>
                            <div className={`${displayName}__column`}>
                                <div className={`${displayName}__button`}>
                                    <Button
                                        type="button"
                                        className="fr-btn--info"
                                        disabled={!hasPreviousPage}
                                        onClick={() =>
                                            handlePrevious(startCursor)
                                        }
                                    >
                                        이전
                                    </Button>
                                </div>
                            </div>
                            <div className={`${displayName}__column`}>
                                <div className={`${displayName}__button`}>
                                    <Button
                                        type="button"
                                        className="fr-btn--info"
                                        disabled={!hasNextPage}
                                        onClick={() => handleNext(endCursor)}
                                    >
                                        다음
                                    </Button>
                                </div>
                            </div>
                        </footer>
                    </div>
                );
            }}
        </Query>
    );
};

export default memo(FollowingUser);
