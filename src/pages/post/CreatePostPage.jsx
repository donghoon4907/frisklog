import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/mutation/post";
import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import Editor from "../../components/Editor";
import { FormInput } from "../../components/Form";
import Button from "../../components/Button";
import { useInput } from "../../hooks";
import Meta from "../../components/Meta";
import Loader from "../../components/Loader";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";

/**
 * 게시물 등록 화면 컴포넌트
 *
 * @Page
 * @author frist
 */
const CreatePostPage = () => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 게시물 등록 mutation 활성화
     */
    const [create, { loading }] = useMutation(CREATE_POST);
    /**
     * 제목 입력을 위한 useInput 활성화
     */
    const title = useInput("");
    /**
     * 카테고리 입력을 위한 useInput 활성화
     */
    const category = useInput("", "no_space");
    /**
     * 내용 상태 관리 모듈 활성화
     */
    const [_content, setContent] = useState("");
    /**
     * 등록 핸들러
     */
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            /**
             * 토큰 로드
             */
            const token = getStorage(TOKEN_KEY);

            if (token) {
                /**
                 * 등록 요청 중인 경우
                 */
                if (loading) {
                    return alert("요청 중입니다");
                }
                if (title.value.length > 50) {
                    return alert("제목은 50자 미만으로 입력하세요.");
                }
                if (category.value.length > 10) {
                    return alert("카테고리는 10자 미만으로 입력하세요.");
                }
                /**
                 * 설명
                 * @type {string}
                 */
                const description = _content.description.substring(0, 255);
                /**
                 * 내용
                 * @type {string}
                 */
                const content = _content.markdown;
                /**
                 * 썸네일
                 * @type {string|undefined}
                 */
                let thumbnail;
                /**
                 * 썸네일 제거 정규식
                 */
                const reg = /\!\[([^\]]+)\]\(([^\)]+)\)/g;

                let foundThumbnails = content.match(reg);

                if (foundThumbnails) {
                    thumbnail = foundThumbnails[0].substring(
                        foundThumbnails[0].indexOf("(") + 1,
                        foundThumbnails[0].lastIndexOf(")")
                    );
                }

                const tf = confirm("입력한 내용으로 게시물을 등록하시겠어요?");

                if (tf) {
                    try {
                        const {
                            data: { createPost }
                        } = await create({
                            variables: {
                                title: title.value,
                                description,
                                content,
                                category: category.value,
                                thumbnail
                            }
                        });
                        if (createPost) {
                            alert("게시물이 등록되었습니다.");
                        }
                    } catch (error) {
                        const { message, status } = JSON.parse(error.message);
                        if (status === 401) {
                            /**
                             * 로그인 팝업 보이기
                             */
                            dispatch({
                                type: SHOW_LOGIN_MODAL
                            });
                        } else {
                            alert(message);
                        }
                    }
                }
            } else {
                /**
                 * 로그인 팝업 보이기
                 */
                dispatch({
                    type: SHOW_LOGIN_MODAL
                });
            }
        },
        [title.value, category.value, _content]
    );

    return (
        <form className="fr-post__form" onSubmit={handleSubmit}>
            {loading && <Loader />}
            <Meta title="게시물 등록" description="create post in frisklog" />
            <div className="fr-post__category">
                <FormInput
                    type="text"
                    placeholder="카테고리를 입력하세요"
                    id="category"
                    autoComplete="off"
                    required
                    {...category}
                    label="카테고리"
                />
            </div>

            <FormInput
                type="text"
                placeholder="제목을 입력하세요"
                id="title"
                autoComplete="off"
                required
                {...title}
                label="제목"
            />
            <Editor onChange={(content) => setContent(content)} />
            <div className="mt-3">
                <Button type="submit">등록</Button>
            </div>
        </form>
    );
};

export default CreatePostPage;
