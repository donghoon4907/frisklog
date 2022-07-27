import React, { useState, useCallback, memo } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_COMMENT, DELETE_COMMENT } from "../graphql/mutation/comment";
import { useInput } from "../hooks";
import { FormTextArea } from "./Form";
import LinkImage from "./LinkImage";
import Button from "./button";
import { TOKEN_KEY, getStorage } from "../lib/cookie";
import { useDispatch, useSelector } from "../context";
import { SHOW_LOGIN_MODAL } from "../context/action";
import Loader from "./Loader";
import { timeForToday } from "../lib/date";
import { graphqlError } from "../lib/error";
import { Dropdown, DropdownItem } from "./Dropdown";
import { More } from "../assets/icon";
import { HOME_PLATFORM_ID } from "../lib/constants";

/**
 * 댓글 렌더링 컴포넌트
 *
 */
const CommentItem = ({ id, content, createdAt, User }) => {
    const displayName = "fr-comment";

    const dispatch = useDispatch();

    const { id: userId } = useSelector();
    // 댓글 수정
    const [upd, { loading: updateLoading }] = useMutation(UPDATE_COMMENT);
    // 댓글 삭제
    const [del, { loading: deleteLoading }] = useMutation(DELETE_COMMENT);
    // 댓글
    const comment = useInput(content);
    // 수정 활성화 여부
    const [activeUpdate, setActiveUpdate] = useState(false);
    // 수정된 댓글
    const [changeComment, setChangeComment] = useState(content);
    // 삭제되어 사용할 수 없게 되었는지 여부
    const [disabled, setDisabled] = useState(false);
    // 내가 작성한 댓글인지 여부
    const isMyComment = userId ? userId == User.id : false;
    // 수정 클릭 핸들러
    const handleShowUpdate = useCallback(() => {
        setActiveUpdate(true);
    }, []);
    // 수정 취소 핸들러
    const handleHideUpdate = useCallback(() => {
        const tf = confirm("수정을 취소하시겠어요?");
        if (tf) {
            setActiveUpdate(false);
        }
    }, []);
    // 댓글 수정 핸들러
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

            if (updateLoading) {
                return alert("요청 중입니다. 잠시만 기다려주세요.");
            }

            if (comment.value.length > 100) {
                return alert("댓글은 100자 미만으로 입력 해주세요.");
            }

            const tf = confirm("입력한 내용으로 수정하시겠어요?");

            if (tf) {
                try {
                    await upd({
                        variables: { id, content: comment.value }
                    });
                    // 댓글 랜더링 상태 변경
                    setChangeComment(comment.value);
                    // 수정 비활성화
                    setActiveUpdate(false);
                } catch (error) {
                    graphqlError({ error, dispatch });
                }
            }
        },
        [updateLoading, comment.value]
    );
    // 댓글 삭제 핸들러
    const handleDelete = useCallback(async () => {
        // 로그인 체크
        const token = getStorage(TOKEN_KEY);

        if (token === null) {
            return dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }

        if (deleteLoading) {
            return alert("요청 중입니다. 잠시만 기다려주세요.");
        }

        const tf = confirm("댓글을 삭제하시겠어요?");

        if (tf) {
            try {
                await del({
                    variables: { id }
                });
                // 컴포넌트 비활성화
                setDisabled(true);
                // 수정 비활성화
                setActiveUpdate(false);
            } catch (error) {
                graphqlError({ error, dispatch });
            }
        }
    }, []);

    return (
        <li className={`${displayName}__wrapper`}>
            {(updateLoading || deleteLoading) && <Loader />}
            <div className={displayName}>
                <div className={`${displayName}__avatar`} title="사용자 링크">
                    <LinkImage
                        ariaLabel="사용자 페이지"
                        domainUrl={User.Platform.domainUrl}
                        path={User.link}
                        src={User.Platform.storageUrl + User.avatar}
                        alt="Avatar"
                        isInternal={User.Platform.id == HOME_PLATFORM_ID}
                    />
                </div>
                <div className={`${displayName}__box`}>
                    <div className={`${displayName}__name`}>
                        <span>
                            <strong>{User.nickname}</strong>
                        </span>
                    </div>
                    <p className={`${displayName}__content`}>{changeComment}</p>
                    <div className={`${displayName}__date`}>
                        <span>{timeForToday(createdAt)}</span>
                    </div>
                </div>
                {isMyComment && (
                    <div className={`${displayName}__extension`}>
                        {
                            <Dropdown id={id} icon={<More />}>
                                <DropdownItem
                                    eventKey="1"
                                    onClick={handleShowUpdate}
                                >
                                    수정
                                </DropdownItem>
                                {/* <DropdownItem
                                    eventKey="2"
                                    onClick={handleDelete}
                                >
                                    삭제
                                </DropdownItem> */}
                            </Dropdown>
                        }
                    </div>
                )}
            </div>

            {activeUpdate ? (
                <form onSubmit={handleSubmit}>
                    <FormTextArea
                        placeholder="댓글을 입력하세요."
                        id={`update_comment${id}`}
                        autoComplete="off"
                        height={100}
                        label="댓글"
                        {...comment}
                    />
                    <div className={`${displayName}__submit`}>
                        <Button type="button" onClick={handleHideUpdate}>
                            취소
                        </Button>
                        <Button type="submit">댓글 수정</Button>
                    </div>
                </form>
            ) : (
                <pre>
                    {disabled ? <em>삭제된 댓글입니다.</em> : changeComment}
                </pre>
            )}
        </li>
    );
};

export default memo(CommentItem);
