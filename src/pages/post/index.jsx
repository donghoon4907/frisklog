import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_POST } from "../../graphql/query/post";
import { DELETE_POST } from "../../graphql/mutation/post";
import { useDispatch, useSelector } from "../../context";
import Avatar from "../../components/Avatar";
import BtnLink from "../../components/BtnLink";
import CommentList from "../../components/CommentList";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
// import Subject from "../../components/Subject";
import { timeForToday } from "../../lib/date";
import Viewer from "../../components/Viewer";
import Query from "../../components/Query";
import PostLike from "../../components/PostLike";
import { graphqlError } from "../../lib/error";

/**
 * 게시물 상세 화면 컴포넌트
 *
 */
const Post = ({
    match: {
        params: { id }
    }
}) => {
    const displayName = "fr-post";

    const history = useHistory();

    const dispatch = useDispatch();

    const { id: userId } = useSelector();

    const [del, { loading: deleteLoading }] = useMutation(DELETE_POST);
    // 게시물 삭제 핸들러
    const handleDelete = useCallback(async () => {
        // 삭제 요청 중인 경우
        if (deleteLoading) {
            return alert("요청중입니다. 잠시만 기다려주세요.");
        }

        const tf = confirm("포스트를 삭제하시겠어요?");

        if (!tf) {
            return;
        }

        try {
            const {
                data: { deletePost }
            } = await del({
                variables: { id }
            });

            if (deletePost) {
                alert("포스트가 삭제되었습니다.");
                // 피드 페이지로 이동
                history.push("/");
            }
        } catch (error) {
            graphqlError({ error, dispatch });
        }
    }, [deleteLoading]);
    // 게시물 수정 핸들러
    const handleUpdate = useCallback(() => {
        const tf = confirm("게시물을 수정하러 가시겠어요?");
        if (tf) {
            history.push(`/update_post/${id}`);
        }
    }, []);

    return (
        <Query query={GET_POST} variables={{ id }}>
            {({ data: { post } }) => (
                <div className={displayName}>
                    {deleteLoading && <Loader />}
                    <Meta
                        title={`Frisklog - ${post.title}`}
                        description={post.description}
                    />
                    <h1 className={`${displayName}__title`}>{post.title}</h1>
                    <div className={`${displayName}__info`}>
                        <div className={`${displayName}__column`}>
                            <Avatar
                                src={post.User.avatar}
                                size="30"
                                userId={post.User.id}
                            />
                            <span>{post.User.nickname}</span>
                            <span>·</span>
                            <span>{timeForToday(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className={`${displayName}__info`}>
                        <div className={`${displayName}__column`}>
                            <div className="d-flex justify-content-start align-items-center">
                                <BtnLink to={`/category/${post.category}`}>
                                    {post.category}
                                </BtnLink>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <PostLike
                                    id={post.id}
                                    likers={post.Likers}
                                    isShowCount={true}
                                />
                            </div>
                        </div>

                        {post.User.id === userId && (
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
                    <Viewer initialValue={post.content} />
                    <hr />
                    <CommentList />
                </div>
            )}
        </Query>
    );
};

export default Post;
