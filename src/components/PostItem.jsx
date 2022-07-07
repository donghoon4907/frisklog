import React, { useRef, useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Avatar from "./Avatar";
import { timeForToday } from "../lib/date";
import PostLike from "./PostLike";
import { marked } from "marked";
import Spinner from "react-loader-spinner";
import { useDispatch, useSelector } from "../context";
import { Dropdown, DropdownItem } from "./Dropdown";
import { More, Comment } from "../assets/icon";
import CommentList from "./CommentList";
import { SHOW_POST_MODAL } from "../context/action";
import { DELETE_POST } from "../graphql/mutation/post";
import { useResizeImage } from "../hooks";
import { graphqlError } from "../lib/error";

/**
 * 게시물 컴포넌트
 *
 * @param {string} props.id           게시물 ID
 * @param {string} props.title        게시물 제목
 * @param {string} props.description  게시물 설명
 * @param {object} props.User         게시물 작성자
 * @param {string} props.createdAt    게시물 작성일
 * @param {number} props.viewCount    게시물 조회수
 * @param {string} props.category     게시물 카테고리
 * @param {string} props.thumbnail    게시물 썸네일
 * @param {string} props.Likers       게시물 좋아요 목록
 * @param {string} props.PostComments 게시물 댓글
 */
const PostItem = ({ id, User, createdAt, category, content, Likers }) => {
    const displayName = "fr-post";

    const dispatch = useDispatch();

    const { id: userId } = useSelector();

    const mdBodyEl = useRef(null);
    // ori 작업 완료 여부
    const [ready] = useResizeImage(mdBodyEl);
    // 댓글 보기 여부
    const [activeComment, setActiveComment] = useState(false);

    // 댓글 클릭 핸들러
    const handleShowComment = useCallback(() => {
        setActiveComment(!activeComment);
    }, [activeComment]);

    // 수정 핸들러
    const handleUpdate = useCallback(() => {
        // 게시물 수정 모달 열기
        dispatch({
            type: SHOW_POST_MODAL,
            id,
            content,
            category
        });
    }, []);

    const [del, { loading }] = useMutation(DELETE_POST);
    // 삭제 핸들러
    const handleDelete = useCallback(async () => {
        if (loading) {
            return alert("요청 중입니다");
        }

        const tf = confirm("게시물을 삭제하시겠어요?");

        if (tf) {
            try {
                const {
                    data: { deletePost }
                } = await del({
                    variables: {
                        id
                    }
                });
                if (deletePost) {
                    alert("삭제되었습니다.");

                    window.location.reload();
                }
            } catch (error) {
                graphqlError({ error, dispatch });
            }
        }
    }, [loading]);

    return (
        <div className={`${displayName}__wrapper`}>
            <article className={displayName}>
                <header className={`${displayName}__header`}>
                    <div
                        className={`${displayName}__avatar`}
                        aria-label="avatar"
                    >
                        <Avatar src={User.avatar} size={38} userId={User.id} />
                    </div>
                    <div className={`${displayName}__user`}>
                        <span className={`${displayName}__username`}>
                            {User.nickname}
                        </span>
                    </div>
                    {userId == User.id && (
                        <Dropdown id={id} icon={<More />}>
                            <DropdownItem eventKey="1" onClick={handleUpdate}>
                                수정
                            </DropdownItem>
                            <DropdownItem eventKey="2" onClick={handleDelete}>
                                삭제
                            </DropdownItem>
                        </Dropdown>
                    )}
                </header>
                <div
                    className={`${displayName}__body ${displayName}__body--expended`}
                >
                    {ready && (
                        <div className={`${displayName}__skeleton`}>
                            <Spinner
                                type="ThreeDots"
                                color="#4142DD"
                                height={80}
                                width={80}
                                visible={true}
                            />
                        </div>
                    )}

                    <div
                        ref={mdBodyEl}
                        className="markdown-body"
                        dangerouslySetInnerHTML={{
                            __html: content ? marked(content) : ""
                        }}
                    />
                    {/* {!expension && (
                        <div className={`${displayName}__expansion`}>
                            <button onClick={handleClick}>더보기</button>
                        </div>
                    )} */}
                </div>
                <footer className={`${displayName}__footer`}>
                    {category && (
                        <div className={`${displayName}__tag`}>
                            <Link to={`/category/${category}`}>
                                #{category}
                            </Link>
                        </div>
                    )}

                    <div className={`${displayName}__more`}>
                        <div>
                            <PostLike
                                id={id}
                                likers={Likers}
                                isShowCount={true}
                            />
                        </div>
                        <div onClick={handleShowComment} role="button">
                            <Comment />
                            <span className="a11y-hidden">댓글 보기</span>
                        </div>
                        <div className={`${displayName}__date`}>
                            {timeForToday(createdAt)}
                        </div>
                    </div>
                    <div>{activeComment && <CommentList postId={id} />}</div>
                </footer>
            </article>
        </div>
    );
};

export default memo(PostItem);
