import React, { useState, useCallback, useEffect, useRef, memo } from "react";
import { Thumbnail } from "../assets/icon";
import { useLazyAxios } from "../hooks";
import { SET_UPLOADED_URL } from "../context/action";
import { useDispatch } from "../context";
import Loader from "./Loader";

/**
 * 이미지 업로드 컴포넌트
 *
 * @param {string?}  props.src            이미지 자원
 * @param {boolean?} props.isActiveUpload 업로드 활성화 여부
 */
const UploadImage = ({ src, isActiveUpload }) => {
    const displayName = "fr-upload";

    const $file = useRef(null);

    const dispatch = useDispatch();

    const { loading, call } = useLazyAxios();
    // 프로필사진 미리보기
    const [preview, setPreview] = useState(src);
    // 파일 클릭 핸들러
    const handleClick = useCallback(() => {
        // upload 비활성화 시
        if (!isActiveUpload) {
            return;
        }

        const node = $file.current;

        if (node) {
            node.click();
        }
    }, [isActiveUpload]);
    // 파일 변경 핸들러
    const handleChange = useCallback(
        async (e) => {
            const { value, files } = e.target;
            // 취소 버튼을 누른 경우
            if (!value) {
                return;
            }
            // 요청 중인 경우
            if (loading) {
                return;
            }

            const [file] = files;

            const formData = new FormData();

            formData.append("file", file);

            const { data, error } = await call({
                method: "post",
                url: `${process.env.RAZZLE_BACKEND_API}/upload`,
                data: formData,
                headers: { "content-type": "multipart/form-data" }
            });

            if (data) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    // 미리보기 상태 변경
                    setPreview(reader.result);
                    // 프로필사진 상태 변경
                    dispatch({
                        type: SET_UPLOADED_URL,
                        uploadedUrl: data
                    });
                };

                reader.readAsDataURL(file);
            }

            if (error) {
                alert(error.response.data);
            }
        },
        [loading]
    );

    useEffect(() => {
        dispatch({
            type: SET_UPLOADED_URL,
            uploadedUrl: ""
        });
    }, []);

    useEffect(() => {
        setPreview(src);
    }, [src]);

    return (
        <div
            className={displayName}
            onClick={handleClick}
            role="button"
            aria-label="Upload"
        >
            {loading && <Loader />}
            {preview && (
                <img
                    className={`${displayName}__image ${
                        isActiveUpload ? `${displayName}__image--active` : ""
                    }`}
                    src={preview}
                    alt="avatar"
                />
            )}
            {isActiveUpload && (
                <div className={`${displayName}__background`}>
                    <Thumbnail style={{ width: 100, height: 50 }} />
                </div>
            )}
            <input
                type="file"
                onChange={handleChange}
                ref={$file}
                hidden
                accept="image/jpg, image/jpeg, image/png, .gif"
            />
        </div>
    );
};

export default memo(UploadImage);
