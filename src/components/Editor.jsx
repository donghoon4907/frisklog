import React, { useCallback, useRef } from "react";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import hljs from "highlight.js";
import Loader from "./Loader";
import { useLazyAxios } from "../hooks";

const Editor =
    typeof window !== "undefined" && require("@toast-ui/react-editor").Editor;

/**
 * * 게시물 에디터 컴포넌트
 *
 * @Component
 * @author frisk
 */
const PostEditor = (props) => {
    const {
        initialValue,
        previewStyle,
        height,
        initialEditType,
        useCommandShortcut,
        onChange
    } = props;

    /**
     * 업로드 요청을 위한 Axios 활성화
     */
    const { loading, call } = useLazyAxios();
    /**
     * editor element
     */
    const $editor = useRef();
    /**
     * 에디터 변경 이벤트
     */
    const handleChange = useCallback(() => {
        const instance = $editor.current.getInstance();
        /**
         * 에디터 output
         * 1. instance.getMarkdown(): markdown type
         * 2. instance.getHtml(): html type
         */
        onChange({
            markdown: instance.getMarkdown(),
            description: instance.preview.el.innerText
        });
    }, [props]);

    return (
        <div className="fr-editor">
            {loading && <Loader />}
            {typeof window !== "undefined" && (
                <Editor
                    {...props}
                    plugins={[[codeSyntaxHightlight, { hljs }]]}
                    initialValue={initialValue || ""}
                    previewStyle={previewStyle || "vertical"}
                    height={height || "75vh"}
                    initialEditType={initialEditType || "markdown"}
                    useCommandShortcut={useCommandShortcut || true}
                    ref={$editor}
                    onChange={handleChange}
                    hooks={{
                        addImageBlobHook: async (blob, callback) => {
                            /**
                             * 업로드 요청 중인 경우
                             */
                            if (loading) {
                                alert("업로드 요청 중입니다.");
                                return;
                            }

                            const formData = new FormData();
                            formData.append("file", blob);

                            const { data, error } = await call({
                                method: "post",
                                url: `${process.env.RAZZLE_BACKEND_API}/upload`,
                                data: formData,
                                headers: {
                                    "content-type": "multipart/form-data"
                                }
                            });

                            if (data) {
                                const path =
                                    process.env.RAZZLE_BACKEND_ROOT + data;

                                callback(path, "");
                            }

                            if (error) {
                                alert("썸네일 업로드 중 오류가 발생했습니다.");
                            }

                            return false;
                        }
                    }}
                />
            )}
        </div>
    );
};

export default PostEditor;
