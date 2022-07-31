import React, { useRef, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { marked } from "marked";

import LinkImage from "./LinkImage";
import { timeForToday } from "../lib/date";
import LikePostBtn from "./button/LikePost";
import ModifyPostBtn from "./button/ModifyPost";
import RemovePostBtn from "./button/RemovePost";
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
    useResizeImage(mdBodyEl);
    // 댓글 보기 여부
    const [activeComment, setActiveComment] = useState(false);

    // 댓글 클릭 핸들러
    const handleShowComment = useCallback(() => {
        setActiveComment(!activeComment);
    }, [activeComment]);

    const isMe = userId == User.id;

    const platform = User.Platform;

    return (
        <div className={`${displayName}__wrapper`}>
            <article className={displayName}>
                <header className={`${displayName}__header`}>
                    <div
                        className={`${displayName}__avatar`}
                        title="사용자 링크"
                    >
                        <LinkImage
                            ariaLabel="사용자 페이지"
                            domainUrl={platform.domainUrl}
                            path={User.link}
                            src={User.avatar}
                            alt="Avatar"
                            isInternal={true}
                        />
                    </div>
                    <div className={`${displayName}__user`}>
                        <span className={`${displayName}__username`}>
                            {User.nickname}
                        </span>
                    </div>
                    {/* <div
                        className={`${displayName}__platform`}
                        title="플랫폼 링크"
                    >
                        <LinkImage
                            ariaLabel={platform.platformName}
                            domainUrl={platform.domainUrl}
                            path=""
                            src={platform.logoUrl}
                            alt="Platform"
                            isInternal={true}
                        />
                    </div> */}
                </header>
                <div
                    className={`${displayName}__body ${displayName}__body--expended`}
                >
                    <div
                        ref={mdBodyEl}
                        className="markdown-body"
                        dangerouslySetInnerHTML={{
                            __html: content ? marked(content) : ""
                        }}
                    />
                </div>
                <footer className={`${displayName}__footer`}>
                    <div className={`${displayName}__tag`}>
                        {Categories.map(({ content }, index) => (
                            <Link
                                key={`post${id}Category${index}`}
                                to={`/category/${content}`}
                                aria-label={`'${content}' 카테고리 검색`}
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

                        <div title="댓글 버튼">
                            <button
                                type="button"
                                onClick={handleShowComment}
                                aria-label="댓글 보기"
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
