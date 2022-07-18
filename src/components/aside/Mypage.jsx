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

/**
 * 사용자정보 컴포넌트
 *
 * @param {object} props.match
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
                    <Meta title={`Frisklog - ${user.nickname}`} />
                    <div className={`${displayName}__wrapper`}>
                        <div className={displayName}>
                            <AsideMypageHeader
                                isMe={isMe}
                                avatar={user.avatar}
                                displayName={displayName}
                            />

                            <div className={`${displayName}__body`}>
                                <div className="fr-avatar__name">
                                    {isMe ? nickname : user.nickname}
                                </div>

                                {isMe && (
                                    <div className={`${displayName}__helper`}>
                                        <ModifyUserBtn />
                                        <LogoutBtn />
                                    </div>
                                )}
                            </div>
                        </div>

                        {isMe && (
                            <div className={`${displayName}__extension`}>
                                <ul>
                                    {mypageOptions
                                        .filter((option) => option.enable)
                                        .map((option) => (
                                            <MypageOrderItem
                                                key={`order_item${option.id}`}
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
