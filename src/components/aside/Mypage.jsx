import React from "react";

import Meta from "../Meta";
import Query from "../Query";
import { GET_USER } from "../../graphql/query/user";
import LogoutBtn from "../button/Logout";
import { useSelector } from "../../context";
import MypageOrderItem from "./MypageOrderItem";
import mypageOptions from "../../json/mypage_options.json";
import AsideMypageHeader from "./MypageHeader";
import ModifyUserBtn from "../button/ModifyUser";
import FollowBtn from "../button/Follow";
import CreateRoomBtn from "../button/CreateRoom";
import { Badge, Text } from "../Status";

/**
 * 사용자정보 컴포넌트
 *
 */
const AsideMypage = ({
    match: {
        params: { id }
    }
}) => {
    const displayName = "fr-mypage";

    const { id: userId, nickname } = useSelector();
    // 마이페이지 여부
    const isMe = id == userId;

    return (
        <Query
            query={GET_USER}
            variables={{
                id
            }}
        >
            {({ data: { user } }) => (
                <>
                    <Meta
                        title={`Frisklog - ${user.nickname}`}
                        description={`Frisklog ${user.nickname} 사용자 페이지입니다.`}
                        url={`/user/${id}`}
                    />
                    <div className={`${displayName}__wrapper`}>
                        <div className={displayName}>
                            <AsideMypageHeader
                                isMe={isMe}
                                avatar={user.avatar}
                                displayName={displayName}
                            />

                            <div className={`${displayName}__body`}>
                                <div className={`${displayName}__user`}>
                                    <div className="fr-avatar__name">
                                        {isMe ? nickname : user.nickname}
                                    </div>
                                    {!isMe && (
                                        <div
                                            className={`${displayName}__follow`}
                                        >
                                            <FollowBtn
                                                userId={id}
                                                followers={user.Followers}
                                            />
                                        </div>
                                    )}
                                </div>

                                {isMe && (
                                    <div className={`${displayName}__helper`}>
                                        <ModifyUserBtn />
                                        <LogoutBtn />
                                    </div>
                                )}
                            </div>
                            <div className={`${displayName}__footer`}>
                                <div className={`${displayName}__status`}>
                                    <Badge status={user.status} />
                                    <Text>{user.statusText}</Text>
                                </div>
                                <div className={`${displayName}__message`}>
                                    {!isMe && <CreateRoomBtn userId={id} />}
                                </div>
                            </div>
                        </div>

                        {isMe && (
                            <div className={`${displayName}__extension`}>
                                <ul>
                                    {mypageOptions
                                        .filter((option) => option.enable)
                                        .map((option) => (
                                            <MypageOrderItem
                                                key={`orderItem${option.id}`}
                                                {...option}
                                            />
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            )}
        </Query>
    );
};

export default AsideMypage;
