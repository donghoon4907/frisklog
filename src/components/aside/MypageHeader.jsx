import React, { useCallback, memo } from "react";
import { useMutation } from "@apollo/client";

import { useSelector, useDispatch } from "../../context";
import UploadImage from "../UploadImage";
import Image from "../Image";
import Button from "../button";
import { SET_UPLOADED_URL, SET_ME } from "../../context/action";
import { UPDATE_USER } from "../../graphql/mutation/user";
import { TOKEN_KEY, setStorage } from "../../lib/cookie";
import { graphqlError } from "../../lib/error";

/**
 * 사용자정보 컴포넌트
 *
 * @param {boolean} props.isMe
 * @param {string}  props.avatar
 * @param {string}  props.displayName
 */
const AsideMypageHeader = ({ isMe, avatar, displayName }) => {
    const dispatch = useDispatch();

    const { uploadedUrl, avatar: myAvatar } = useSelector();

    // 프로필 사진 변경
    const [uptAvatar, { loading }] = useMutation(UPDATE_USER);
    // 프로필 사진 변경 취소 핸들러
    const handleCancelUptAvatar = useCallback(() => {
        dispatch({
            type: SET_UPLOADED_URL,
            uploadedUrl: ""
        });
    }, []);
    // 프로필 사진 변경 핸들러
    const handleUptAvatar = useCallback(
        async (e) => {
            e.preventDefault();

            const tf = confirm("사진을 변경하시겠어요?");

            if (tf) {
                try {
                    const {
                        data: { updateUser }
                    } = await uptAvatar({
                        variables: {
                            avatar: uploadedUrl
                        }
                    });

                    if (updateUser) {
                        const { token, avatar } = updateUser;
                        // 토큰 설정
                        setStorage(TOKEN_KEY, token);

                        // 상태 동기화
                        dispatch({
                            type: SET_ME,
                            avatar
                        });

                        // 업로드 상태 초기화
                        handleCancelUptAvatar();

                        alert("변경되었습니다.");
                    }
                } catch (error) {
                    graphqlError({ error, dispatch });
                }
            }
        },
        [loading, uploadedUrl]
    );

    return (
        <>
            <div className={`${displayName}__header`}>
                {isMe ? (
                    <UploadImage
                        src={process.env.RAZZLE_BACKEND_ROOT + myAvatar}
                    />
                ) : (
                    <Image
                        src={process.env.RAZZLE_BACKEND_ROOT + avatar}
                        alt="Avatar"
                    />
                )}
            </div>

            {isMe && uploadedUrl && (
                <form className={`${displayName}__upt`}>
                    <Button onClick={handleCancelUptAvatar}>취소</Button>
                    <Button type="submit" onClick={handleUptAvatar}>
                        사진 변경
                    </Button>
                </form>
            )}
        </>
    );
};

export default memo(AsideMypageHeader);
