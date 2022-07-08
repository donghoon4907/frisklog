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
>>>>>>> fd96b1d ([User] Mypage - add update btn)

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
                            <AsideMypageHeader
                                isActiveUpload={id == userId}
                                avatar={user.avatar}
                                displayName={displayName}
                            />

                            <div className={`${displayName}__body`}>
                                <div className="fr-avatar__name">
                                    {user.nickname}
                                </div>
                                <div className={`${displayName}__helper`}>
                                    {userId == id && <LogoutBtn />}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Query>
    );
};

export default AsideMypage;
