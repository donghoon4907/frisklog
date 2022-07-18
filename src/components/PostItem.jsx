import React, { useRef, useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { marked } from "marked";

import Avatar from "./Avatar";
import { timeForToday } from "../lib/date";
import LikePostBtn from "./button/LikePost";
import ModifyPostBtn from "./button/ModifyPost";
import RemovePostBtn from "./button/RemovePost";
import Spinner from "react-loader-spinner";
import { useSelector } from "../context";
import { Comment } from "../assets/icon";
import CommentList from "./CommentList";
import { useResizeImage } from "../hooks";

/**
 * 게시물 컴포넌트
 *
 * @param {string}   props.id           게시물 ID
 * @param {string}   props.content      게시물 내용
 * @param {object}   props.User         게시물 작성자
 * @param {string}   props.createdAt    게시물 작성일
 * @param {object[]} props.Categories   게시물 카테고리
 * @param {string}   props.Likers       게시물 좋아요 목록
 */
const PostItem = ({ id, createdAt, User, Categories, content, Likers }) => {
    const displayName = "fr-post";

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

    const isInternal =
        User.Platform.id == process.env.RAZZLE_FRISKLOG_PLATFORM_ID;

    const isMe = userId == User.id;

    return (
        <div className={`${displayName}__wrapper`}>
            <article className={displayName}>
                <header className={`${displayName}__header`}>
                    <div className={`${displayName}__avatar`} title="Avatar">
                        <Avatar
                            ariaLabel="Avatar"
                            domainUrl={User.Platform.domainUrl}
                            path={User.link}
                            storageUrl={User.Platform.storageUrl}
                            src={User.avatar}
                            isInternal={isInternal}
                            size={38}
                        />
                    </div>
                    <div className={`${displayName}__user`}>
                        <span className={`${displayName}__username`}>
                            {User.nickname}
                        </span>
                    </div>
                    <div
                        className={`${displayName}__platform`}
                        title="Platform"
                    >
                        <Avatar
                            ariaLabel="Platform"
                            path=""
                            domainUrl={User.Platform.domainUrl}
                            storageUrl={process.env.RAZZLE_BACKEND_ROOT}
                            src={User.Platform.logoUrl}
                            size={38}
                            isInternal={isInternal}
                        />
                    </div>
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
                    <div className={`${displayName}__tag`}>
                        {Categories.map(({ content }, index) => (
                            <Link
                                key={`post${id}Category${index}`}
                                to={`/category/${content}`}
                                aria-label="Post category"
                            >
                                #{content}
                            </Link>
                        ))}
                    </div>

                    <div className={`${displayName}__more`}>
                        <div>
                            <LikePostBtn
                                postId={id}
                                likers={Likers}
                                isShowCount={true}
                            />
                        </div>

                        <div title="Show comment">
                            <button
                                onClick={handleShowComment}
                                aria-label="Show comment"
                            >
                                <Comment />
                            </button>
                        </div>
                        {isMe && (
                            <>
                                <ModifyPostBtn
                                    postId={id}
                                    content={content}
                                    categories={Categories}
                                />
                                <RemovePostBtn postId={id} />
                            </>
                        )}

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
