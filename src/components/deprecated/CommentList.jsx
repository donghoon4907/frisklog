import React, { memo, useCallback, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMMENTS } from "../../graphql/query/comment";
import { CREATE_COMMENT } from "../../graphql/mutation/comment";
import { useInput } from "../../hooks";
import { FormTextArea } from "../Form";
import Button from "../button";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";
import { useDispatch } from "../../context";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import CommentItem from "../CommentItem";
import Loader from "../Loader";

/**
 * * 댓글 목록 렌더링 컴포넌트
 *
 * @deprecated
 */
const CommentList = () => {
    /**
     * route match 모듈 활성화
     */
    const {
        params: { id }
    } = useRouteMatch("/post/:id");
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 댓글 목록 로드
     */
    const { data, loading, fetchMore, refetch } = useQuery(GET_COMMENTS, {
        variables: {
            first: 30,
            postId: id
        },
        notifyOnNetworkStatusChange: true
    });
    /**
     * 댓글 입력을 위한 useInput 활성화
     */
    const comment = useInput("");
    /**
     * 댓글 추가 mutation 활성화
     */
    const [create, { loading: createLoading }] = useMutation(CREATE_COMMENT);

    /**
     * 댓글 추가 핸들러
     */
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            /**
             * 요청 중인 경우
             */
            if (createLoading) {
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }
            /**
             * 토큰 로드
             */
            const token = getStorage(TOKEN_KEY);

            if (token) {
                if (comment.value.length > 100) {
                    return alert("댓글은 100자 미만으로 입력 해주세요.");
                }

                try {
                    await create({
                        variables: {
                            postId: id,
                            content: comment.value
                        }
                    });

                    /**
                     * 댓글 초기화
                     */
                    refetch();
                    comment.setValue("");
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
            } else {
                /**
                 * 로그인 팝업 보이기
                 */
                dispatch({
                    type: SHOW_LOGIN_MODAL
                });
            }
        },
        [comment.value, createLoading]
    );

    /**
     * 스크롤 이벤트 핸들러
     */
    const handleFetchMore = () => {
        if (data && data.comments) {
            /**
             * 요청 중인 경우
             */
            if (loading) {
                return;
            }
            const $main = document.querySelector("#main");

            const { scrollHeight, clientHeight, scrollTop } = $main;

            const { comments } = data;

            if (scrollTop + clientHeight === scrollHeight) {
                if (
                    comments.data.length > 0 &&
                    comments.data.length % 30 === 0
                ) {
                    /**
                     * 추가 게시물 요청
                     */
                    fetchMore({
                        variables: {
                            skip: comments.data.length,
                            first: 30,
                            postId: id
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (fetchMoreResult) {
                                return {
                                    comments: {
                                        data: [
                                            ...prev.comments.data,
                                            ...fetchMoreResult.comments.data
                                        ],
                                        total: comments.total
                                    }
                                };
                            } else {
                                return prev;
                            }
                        }
                    });
                }
            }
        }
    };

    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        const $main = document.querySelector("#main");
        /**
         * 스크롤 이벤트 바인딩
         */
        $main.addEventListener("scroll", handleFetchMore);
        /**
         * 스크롤 이벤트 언바인딩
         */
        return () => $main.removeEventListener("scroll", handleFetchMore);
    }, [data && data.comments, loading]);

    return (
        <form className="d-flex flex-column mt-4" onSubmit={handleSubmit}>
            {(loading || createLoading) && <Loader />}
            <FormTextArea
                placeholder="댓글을 입력하세요."
                id="comment"
                autoComplete="off"
                height={100}
                {...comment}
                required
                label="댓글"
            />
            <Button type="submit">댓글 작성</Button>
            <ul>
                {data &&
                    data.comments.data.map((comment) => (
                        <CommentItem key={comment.id} {...comment} />
                    ))}
            </ul>
        </form>
    );
};

export default memo(CommentList);
