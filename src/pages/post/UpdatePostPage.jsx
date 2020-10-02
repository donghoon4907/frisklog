import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_POST } from "../../graphql/mutation/post";
import { GET_POST } from "../../graphql/query/post";
import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import Editor from "../../components/Editor";
import Button from "../../components/Button";
import { useInput } from "../../hooks";
import Loader from "../../components/Loader";
import { TOKEN_KEY, getStorage } from "../../lib/state";
import { FormInput } from "../../components/Form";

const Container = styled.div`
    & input {
        background: white;
    }
`;

const CategoryWrapper = styled.div`
    height: auto;
    min-height: 50px;
    display: flex;
    justify-content: flex-start;
`;

const SubmitWrapper = styled.div`
    margin-top: 1rem;
`;

/**
 * 게시물 수정 화면 컴포넌트
 *
 * @Nextpage
 * @author frist
 */
const UpdatePostPage = ({ match }) => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 포스트 상세 로드
     */
    const { data } = useQuery(GET_POST, {
        variables: {
            id: match.params.id
        }
    });
    /**
     * 게시물 수정 mutation 활성화
     */
    const [upd, { loading: updatePostLoading }] = useMutation(UPDATE_POST);
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
    const [content, setContent] = useState("");
    /**
     * 등록 핸들러
     */
    const handleSubmit = useCallback(async () => {
        /**
         * 토큰 로드
         */
        const token = getStorage(TOKEN_KEY);

        if (token) {
            /**
             * 등록 요청 중인 경우
             */
            if (updatePostLoading) {
                return alert("요청 중입니다");
            }
            if (!title.value) {
                return alert("제목을 입력하세요.");
            }
            if (title.value.length > 50) {
                return alert("제목은 50자 미만으로 입력하세요.");
            }
            if (category.value.length > 10) {
                return alert("카테고리는 10자 미만으로 입력하세요.");
            }
            /**
             * 썸네일, 설명
             * @type {string|undefined}
             */
            let thumbnail, description;
            /**
             * 썸네일 유무 체크
             */
            const reg = /\!\[([^\]]+)\]\(([^\)]+)\)/g;

            let foundThumbnails = content.match(reg);

            if (foundThumbnails) {
                thumbnail = foundThumbnails[0].substring(
                    foundThumbnails[0].indexOf("(") + 1,
                    foundThumbnails[0].lastIndexOf(")")
                );
                description = content.replace(reg, "");
            } else {
                description = content;
            }
            /**
             * 특수문자 제거 정규식
             */
            const reg2 = /[\{\}\[\]\/;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

            description = description.replace(reg2, "");

            const tf = confirm("입력한 내용으로 게시물을 수정하시겠어요?");

            if (tf) {
                try {
                    const {
                        data: { updatePost }
                    } = await upd({
                        variables: {
                            id: post.id,
                            title: title.value,
                            description,
                            content,
                            category: category.value,
                            thumbnail
                        }
                    });
                    if (updatePost) {
                        alert("게시물이 수정되었습니다.");
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
    }, [updatePostLoading, title.value, category.value, content]);

    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        if (data && data.post) {
            const { post } = data;
            title.setValue(post.title);
            category.setValue(post.category);
            setContent(post.content);
        }
    }, [data]);

    if (!data) {
        return <Loader />;
    }

    const { post } = data;

    return (
        <Container>
            {updatePostLoading && <Loader />}
            <CategoryWrapper>
                <FormInput
                    type="text"
                    placeholder="카테고리를 입력하세요"
                    name="category"
                    autoComplete="off"
                    required
                    label="카테고리"
                    {...category}
                />
            </CategoryWrapper>
            <FormInput
                type="text"
                placeholder="제목을 입력하세요"
                name="title"
                autoComplete="off"
                required
                label="제목"
                {...title}
            />
            <Editor
                onChange={(content) => setContent(content)}
                initialValue={post.content}
                initialEditType="markdown"
            />
            <SubmitWrapper>
                <Button onClick={handleSubmit}>수정</Button>
            </SubmitWrapper>
        </Container>
    );
};

export default UpdatePostPage;
