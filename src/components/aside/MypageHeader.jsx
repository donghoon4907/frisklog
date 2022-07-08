import React, { useCallback, memo } from "react";
import { useMutation } from "@apollo/client";

import { useSelector, useDispatch } from "../../context";
import UploadImage from "../UploadImage";
import Button from "../button";
import { SET_UPLOADED_URL, SET_ME } from "../../context/action";
import { UPDATE_USER } from "../../graphql/mutation/user";

/**
 * 사용자정보 컴포넌트
 *
 * @param {string} props.isActiveUpload
 * @param {string} props.displayName
 */
const AsideMypageHeader = ({ isActiveUpload, avatar, displayName }) => {
    const dispatch = useDispatch();

    const { uploadedUrl } = useSelector();
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
                        alert("변경되었습니다.");
                        // 상태 동기화
                        dispatch({
                            type: SET_ME,
                            avatar: uploadedUrl
                        });

                        // 업로드 상태 초기화
                        handleCancelUptAvatar();
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
                <UploadImage
                    src={
                        process.env.RAZZLE_BACKEND_ROOT +
                        (avatar || process.env.RAZZLE_DEFAULT_AVATAR)
                    }
                    isActiveUpload={isActiveUpload}
                />
            </div>
            {uploadedUrl && (
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
