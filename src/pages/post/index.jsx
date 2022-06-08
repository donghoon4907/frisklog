import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST } from "../../graphql/query/post";
import { DELETE_POST, LIKE_POST } from "../../graphql/mutation/post";
import { useDispatch, useSelector } from "../../context";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import Avatar from "../../components/Avatar";
import BtnLink from "../../components/BtnLink";
import { HeartEmpty, HeartFull } from "../../assets/icon";
import { TOKEN_KEY, getStorage } from "../../lib/cookie";
import CommentList from "../../components/CommentList";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import Subject from "../../components/Subject";
import { timeForToday } from "../../lib/date";
import Viewer from "../../components/Viewer";

/**
 * 게시물 상세 화면 컴포넌트
 *
 * @Nextpage
 * @author frist
 */
const Post = ({
    match: {
        params: { id }
    }
}) => {
    const displayName = "fr-post";
    /**
     * history 객체 활성화
     */
    const history = useHistory();
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { id: userId } = useSelector();
    /**
     * 댓글 목록 로드
     */
    const { data } = useQuery(GET_POST, {
        variables: {
            id
        }
    });

    /**
     * 좋아요 mutation 활성화
     */
    const [like] = useMutation(LIKE_POST);
    /**
     * 게시물 삭제 mutation 활성화
     */
    const [del, { loading: deleteLoading }] = useMutation(DELETE_POST);
    /**
     * 좋아요 여부 상태 관리 모듈 활성화
     */
    const [isLike, setIsLike] = useState(false);
    /**
     * 좋아요 수 상태 관리 모듈 활성화
     */
    const [likeCount, setLikeCount] = useState(false);
    /**
     * 좋아요 핸들러
     */
    const handleLike = useCallback(async () => {
        /**
         * 토큰 로드
         */
        const token = getStorage(TOKEN_KEY);

        if (token) {
            /**
             * 좋아요 여부 상태 업데이트
             */
            setIsLike(!isLike);
            /**
             * 좋아요 수 상태 업데이트
             */
            setLikeCount(isLike ? likeCount - 1 : likeCount + 1);

            try {
                await like({
                    variables: { id }
                });
            } catch (error) {
                const { message } = JSON.parse(error.message);
                alert(message);
            }
        } else {
            /**
             * 로그인 팝업 보이기
             */
            dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }
    }, [isLike, likeCount]);
    /**
     * 게시물 삭제 핸들러
     */
    const handleDelete = useCallback(async () => {
        /**
         * 삭제 요청 중인 경우
         */
        if (deleteLoading) {
            return alert("요청중입니다. 잠시만 기다려주세요.");
        }

        const tf = confirm("포스트를 삭제하시겠어요?");

        if (tf) {
            try {
                const {
                    data: { deletePost }
                } = await del({
                    variables: { id }
                });

                if (deletePost) {
                    alert("포스트가 삭제되었습니다.");
                    /**
                     * 피드 페이지로 이동
                     */
                    history.push("/");
                }
            } catch (error) {
                const { message } = JSON.parse(error.message);
                alert(message);
            }
        }
    }, [deleteLoading]);
    /**
     * 게시물 수정 핸들러
     */
    const handleUpdate = useCallback(() => {
        const tf = confirm("게시물을 수정하러 가시겠어요?");
        if (tf) {
            history.push(`/update_post/${id}`);
        }
    }, []);

    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        if (data && data.post) {
            const { likes } = data.post;
            /**
             * 내가 좋아요 했는지 여부
             */
            const isLikePost = likes.some((like) => like.user.id === userId);
            /**
             * 좋아요 여부 상태 업데이트
             */
            setIsLike(isLikePost);
            /**
             * 좋아요 수 상태 업데이트
             */
            setLikeCount(likes.length);
        }
    }, [data && data.post, userId]);

    if (!data) {
        return <Loader />;
    }

    const {
        title,
        description,
        user,
        createdAt,
        content,
        category,
        viewCount
    } = data.post;
    /**
     * 내가 작성했는지 여부
     */
    const isMyPost = userId ? userId === user.id : false;

    return (
        <div className={displayName}>
            {deleteLoading && <Loader />}
            <Meta title={`Frisklog - ${title}`} description={description} />
            <Subject>{title}</Subject>
            <div className={`${displayName}__info`}>
                <div className={`${displayName}__column`}>
                    <Avatar src={user.avatar.url} size="30" userId={user.id} />
                    <span>{user.nickname}</span>
                    <span>·</span>
                    <span>{timeForToday(createdAt)}</span>
                </div>
            </div>
            <div className={`${displayName}__info`}>
                <div className={`${displayName}__column`}>
                    <div className="d-flex justify-content-start align-items-center">
                        <BtnLink to={`/category/${category}`}>
                            {category}
                        </BtnLink>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                        <button onClick={handleLike}>
                            {isLike ? (
                                <HeartFull style={{ width: 32, height: 32 }} />
                            ) : (
                                <HeartEmpty style={{ width: 32, height: 32 }} />
                            )}
                            <span className="a11y-hidden">
                                {isLike ? "좋아요 취소하기" : "좋아요 하기"}
                            </span>
                        </button>
                        <span>{likeCount}</span>
                    </div>
                </div>

                {isMyPost && (
                    <div>
                        <button
                            className="btn btn-info mr-1"
                            onClick={handleUpdate}
                        >
                            수정
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
            <Viewer initialValue={content} />
            <hr />
            <CommentList />
        </div>
    );
};

export default Post;
