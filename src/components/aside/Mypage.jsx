import React from "react";

import Meta from "../Meta";
import Query from "../Query";
import { GET_USER } from "../../graphql/query/user";
import LogoutBtn from "../button/Logout";
import { useSelector } from "../../context";
import MypageOrderItem from "./MypageOrderItem";
import mypageOptions from "../../json/mypage_options.json";

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

    const { id: userId } = useSelector();

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
                            <div className={`${displayName}__header`}>
                                <div
                                    className={`${displayName}__avatar`}
                                    style={{
                                        backgroundImage: `
                                        linear-gradient(
                                            rgba(0, 0, 0, 0), 
                                            rgba(0, 0, 0, 0.15)
                                        ), url(${
                                            process.env.RAZZLE_BACKEND_ROOT +
                                            (user.avatar ||
                                                process.env
                                                    .RAZZLE_DEFAULT_AVATAR)
                                        })`
                                    }}
                                ></div>
                            </div>
                            <div className={`${displayName}__body`}>
                                <div className="fr-avatar__name">
                                    {user.nickname}
                                </div>
                                <div className={`${displayName}__helper`}>
                                    {userId == id && <LogoutBtn />}
                                </div>
                            </div>
                        </div>

                        {userId == id && (
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
