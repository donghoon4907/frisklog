import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../../../graphql/mutation/post";
import { useDispatch } from "../../../../context";
import { SHOW_LOGIN_MODAL } from "../../../../context/action";
import Editor from "../../../Editor";
import { FormInput } from "../../../Form";
import Button from "../../../button";
import { useInput } from "../../../../hooks";
import Meta from "../../../Meta";
import Loader from "../../../Loader";
import { TOKEN_KEY, getStorage } from "../../../../lib/cookie";
import { graphqlError } from "../../../../lib/error";

/**
 * 게시물 등록 화면 컴포넌트
 *
 * @deprecated
 */
const CreatePostPage = () => {
    const displayName = "fr-create-post";

    const dispatch = useDispatch();
    // 게시물 등록 mutation
    const [create, { loading }] = useMutation(CREATE_POST);

    // const title = useInput("");

    const category = useInput("", "no_space");
    // 내용 상태 관리 모듈 활성화
    const [_content, setContent] = useState("");
    // 등록 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            // 로그인 체크
            const token = getStorage(TOKEN_KEY);

            if (token === null) {
                return dispatch({
                    type: SHOW_LOGIN_MODAL
                });
            }

            if (loading) {
                return alert("요청 중입니다");
            }
            // if (title.value.length > 50) {
            //     return alert("제목은 50자 미만으로 입력하세요.");
            // }
            if (category.value.length > 10) {
                return alert("카테고리는 10자 미만으로 입력하세요.");
            }

            // const description = _content.description.substring(0, 255);
            // 내용
            const content = _content.markdown;
            // 썸네일
            // let thumbnail;
            // 썸네일 제거 정규식
            // const reg = /\!\[([^\]]+)\]\(([^\)]+)\)/g;

            // const foundThumbnails = content.match(reg);

            // if (foundThumbnails) {
            //     thumbnail = foundThumbnails[0].substring(
            //         foundThumbnails[0].indexOf("(") + 1,
            //         foundThumbnails[0].lastIndexOf(")")
            //     );
            // }

            const tf = confirm("입력한 내용으로 게시물을 등록하시겠어요?");

            if (tf) {
                try {
                    const {
                        data: { addPost }
                    } = await create({
                        variables: {
                            // title: title.value,
                            // description,
                            content,
                            category: category.value
                            // thumbnail
                        }
                    });
                    if (addPost) {
                        alert("게시물이 등록되었습니다.");
                    }
                } catch (error) {
                    graphqlError({ error, dispatch });
                }
            }
        },
        [
            // title.value,
            // category.value,
            _content
        ]
    );

    return (
        <div className={`${displayName}__wrapper`}>
            {loading && <Loader />}
            <Meta title="게시물 등록" description="create post in frisklog" />
            <form className={`${displayName}`} onSubmit={handleSubmit}>
                <div className="fr-post__category">
                    <FormInput
                        type="text"
                        placeholder="카테고리를 입력하세요"
                        id="category"
                        autoComplete="off"
                        {...category}
                        label="카테고리"
                    />
                </div>

                {/* <FormInput
                type="text"
                placeholder="제목을 입력하세요"
                id="title"
                autoComplete="off"
                required
                {...title}
                label="제목"
            /> */}
                <div className={`${displayName}__body`}>
                    <Editor
                        height="50vh"
                        onChange={(content) => setContent(content)}
                    />
                </div>

                <div className="mt-3">
                    <Button type="submit">등록</Button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostPage;
