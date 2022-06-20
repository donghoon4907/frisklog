import React, { useEffect, useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { timeForToday } from "../lib/date";
import PostLike from "./PostLike";
import { marked } from "marked";
import Spinner from "react-loader-spinner";
import { useSelector } from "../context";
import UpdatePostBtn from "./button/UpdatePost";
import DeletePostBtn from "./button/DeletePost";
import { Dropdown } from "react-bootstrap";
import CustomDropdown from "./Dropdown";
import { More } from "../assets/icon";

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

    const { id: userId } = useSelector();

    const mdBodyEl = useRef(null);
    // 이미지 로딩 여부
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const imgs = mdBodyEl.current.querySelectorAll("img");
        // 이미지가 없는 게시물인 경우
        if (imgs.length === 0) {
            setLoading(false);
        }
        // 이미지 리사이징
        imgs.forEach((img, idx) => {
            const obj = new Image();

            obj.src = img.src;

            obj.onload = function () {
                const width = this.width;

                const height = this.height;

                const wrapper = img.parentNode;

                wrapper.classList.add("fr-thumbnail");

                wrapper.style.paddingBottom = `calc(${height / width} * 100%)`;

                img.classList.add("fr-thumbnail__image");

                if (idx === imgs.length - 1) {
                    setLoading(false);
                }
            };
        });
    }, []);

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
                        <CustomDropdown id={id} icon={<More />}>
                            <Dropdown.Item eventKey="1">
                                <UpdatePostBtn
                                    id={id}
                                    category={category}
                                    content={content}
                                />
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                <DeletePostBtn id={id} />
                            </Dropdown.Item>
                        </CustomDropdown>
                    )}
                </header>
                <div
                    className={`${displayName}__body ${displayName}__body--expended`}
                >
                    {loading && (
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
                        <div>{timeForToday(createdAt)}</div>
                    </div>
                </footer>
            </article>
        </div>
    );
};

export default memo(PostItem);
