import React from "react";

import Meta from "../../components/Meta";
import Query from "../../components/Query";
import { GET_ROOM } from "../../graphql/query/room";
import LinkImage from "../../components/LinkImage";

/**
 * 팔로우 화면 컴포넌트
 *
 */
const Room = ({
    match: {
        params: { id }
    }
}) => {
    const displayName = "fr-room";

    return (
        <>
            <Meta title="Frisklog - 아직안정함" />
            <div className={`${displayName}__wrapper`}>
                <Query
                    query={GET_ROOM}
                    variables={{
                        id
                    }}
                >
                    {({ data: { room } }) => (
                        <>
                            <div
                                className={`${displayName}__avatar`}
                                title="사용자 링크"
                            >
                                <LinkImage
                                    ariaLabel="사용자 페이지로 이동"
                                    path={room.Partner.link}
                                    src={room.Partner.avatar}
                                    alt="Avatar"
                                    isInternal={true}
                                />
                            </div>
                            <div className="fr-main__title">
                                <h2>{room.Partner.nickname}</h2>
                            </div>
                        </>
                    )}
                </Query>
            </div>
        </>
    );
};

export default Room;
