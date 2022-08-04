import React, { useState, useCallback, memo } from "react";

import Query from "../Query";
import { GET_FOLLOWINGS } from "../../graphql/query/user";
import UserListTypeItem from "../UserListTypeItem";
import Button from "../button";

/**
 * 팔로잉 사용자 컴포넌트
 *
 */
const FollowingUser = () => {
    const [before, setBefore] = useState("");

    const [after, setAfter] = useState("");

    const [enableSetting, setEnableSetting] = useState(false);

    const handleClickSetting = useCallback(() => {
        setEnableSetting(!enableSetting);
    }, [enableSetting]);

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
                after
            }}
        >
            {({ data: { followings } }) => {
                const { totalCount, edges, pageInfo } = followings;

                if (totalCount === 0) {
                    return null;
                }
                const nodes = edges.map((edge) => edge.node);

                const {
                    hasPreviousPage,
                    hasNextPage,
                    startCursor,
                    endCursor
                } = pageInfo;

                return (
                    <div className="fr-following__wrapper">
                        <header className="fr-following__header">
                            <div className="fr-following__column">
                                <div style={{ width: 50 }}>
                                    <Button
                                        type="button"
                                        className={
                                            enableSetting
                                                ? "fr-btn--warning"
                                                : "fr-btn--info"
                                        }
                                        onClick={handleClickSetting}
                                    >
                                        {enableSetting ? "취소" : "관리"}
                                    </Button>
                                </div>
                            </div>
                            {enableSetting && (
                                <div className="fr-following__column">
                                    <div style={{ width: 50 }}>
                                        <Button
                                            type="button"
                                            className="fr-btn--danger"
                                        >
                                            삭제
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </header>
                        <ul className="fr-following">
                            {nodes.map((user, idx) => (
                                <UserListTypeItem
                                    key={`followItem${idx}`}
                                    isShowCheckbox={enableSetting}
                                    {...user}
                                />
                            ))}
                        </ul>
                        <footer className="fr-following__footer">
                            <div className="fr-following__column">
                                <div style={{ width: 50 }}>
                                    <Button
                                        type="button"
                                        className="fr-btn--primary"
                                        disabled={!hasPreviousPage}
                                        onClick={() =>
                                            handlePrevious(startCursor)
                                        }
                                    >
                                        이전
                                    </Button>
                                </div>
                            </div>
                            <div className="fr-following__column">
                                <div style={{ width: 50 }}>
                                    <Button
                                        type="button"
                                        className="fr-btn--primary"
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
