import React from "react";
// import Button from "../button";
import Meta from "../Meta";
import Query from "../Query";
import { GET_USER } from "../../graphql/query/user";
import LogoutBtn from "../button/Logout";
import { useSelector } from "../../context";
<<<<<<< HEAD
=======
import MypageOrderItem from "./MypageOrderItem";
import mypageOptions from "../../json/mypage_options.json";
<<<<<<< HEAD
import UploadImage from "../UploadImage";
>>>>>>> c964737 ([User] Mypage, 업로드 이미지 컴포넌트 추가)
=======
import AsideMypageHeader from "./MypageHeader";
<<<<<<< HEAD
>>>>>>> fd96b1d ([User] Mypage - add update btn)
=======
import UpdateUserBtn from "../button/UpdateUser";
>>>>>>> 62669b3 ([User] Mypage - fin)

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
                                        <UpdateUserBtn />
                                        <LogoutBtn />
                                    </div>
                                )}
                            </div>
                        </div>
<<<<<<< HEAD
=======

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
>>>>>>> d870e33 ([Front] Fix mypage bug - 1,2)
                    </div>
                </>
            )}
        </Query>
    );
};

export default AsideMypage;
