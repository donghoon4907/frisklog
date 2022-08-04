import React, { useState, useCallback, memo } from "react";

import Query from "../Query";
import { GET_FOLLOWINGS } from "../../graphql/query/user";
import UserListTypeItem from "../UserListTypeItem";
import Button from "../button";

/**
 * 팔로잉 사용자 컴포넌트
 *
 */
const FollowingUser = ({ userId }) => {
    const [enableSetting, setEnableSetting] = useState(false);

    const handleClickSetting = useCallback(() => {
        setEnableSetting(!enableSetting);
    }, [enableSetting]);

    return (
        <Query
            query={GET_FOLLOWINGS}
            fetchPolicy="cache-and-network"
            variables={{
                limit: 5,
                userId
            }}
        >
            {({ data: { followings } }) => {
                if (followings.length === 0) {
                    return null;
                }

                return (
                    <div className="fr-following__wrapper">
                        <header className="fr-following__header">
                            <div className="fr-following__column">
                                <div style={{ width: 50 }}>
                                    <Button
                                        type="button"
                                        className="fr-btn--primary"
                                        onClick={handleClickSetting}
                                    >
                                        관리
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
                            {followings.map((user, idx) => (
                                <UserListTypeItem
                                    key={`followItem${idx}`}
                                    isShowCheckbox={enableSetting}
                                    {...user}
                                />
                            ))}
                        </ul>
                        <footer className="fr-following__footer">
                            <ul className="fr-paginate">
                                <li className="fr-paginate__item">1</li>
                                <li className="fr-paginate__item">2</li>
                                <li className="fr-paginate__item">3</li>
                                <li className="fr-paginate__item">4</li>
                                <li className="fr-paginate__item">5</li>
                            </ul>
                        </footer>
                    </div>
                );
            }}
        </Query>
    );
};

export default memo(FollowingUser);
