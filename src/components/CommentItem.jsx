import React, { useState, useCallback, memo } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT, DELETE_COMMENT } from "../graphql/mutation/comment";
import { useInput } from "../hooks";
import { FormTextArea } from "./Form";
import Avatar from "./Avatar";
import Button from "./Button";
import { TOKEN_KEY, getStorage } from "../lib/cookie";
import { useDispatch } from "../context";
import { SHOW_LOGIN_MODAL } from "../context/action";
import { useSelector } from "../context";
import Loader from "./Loader";
import { timeForToday } from "../lib/date";
import Dropdown from "./Dropdown";

/**
 * 댓글 렌더링 컴포넌트
 *
 * @Component
 * @author frisk
 */
const CommentItem = ({ id, content, user, createdAt }) => {
    const displayName = "fr-comment";
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 로컬 상태 관리 모듈 활성화
     */
    const { id: userId } = useSelector();
    /**
     * 댓글 수정 mutation 활성화
     */
    const [upd, { loading: updateLoading }] = useMutation(UPDATE_COMMENT);
    /**
     * 댓글 삭제 mutation 활성화
     */
    const [del, { loading: deleteLoading }] = useMutation(DELETE_COMMENT);
    /**
     * 댓글 입력을 위한 useInput 활성화
     */
    const comment = useInput(content);
    /**
     * 수정모드 전환 상태 관리 모듈 활성화
     */
    const [active, setActive] = useState(false);
    /**
     * 수정모드 전환 상태 관리 모듈 활성화
     */
    const [contentState, setContentState] = useState(content);
    /**
     * 삭제 상태 관리 모듈 활성화
     */
    const [disabled, setDisabled] = useState(false);
    /**
     * 내가 작성한 댓글 여부
     */
    const isMyComment = userId ? userId === user.id : false;
    /**
     * 수정 모드 전환 핸들러
     */
    const handleActive = useCallback(() => {
        setActive(true);
    }, []);
    /**
     * 취소 핸들러
     */
    const handleCancel = useCallback(() => {
        const tf = confirm("수정을 취소하시겠어요?");
        if (tf) {
            setActive(false);
        }
    }, []);
    /**
     * 댓글 수정 핸들러
     */
    const handleUpdate = useCallback(async () => {
        /**
         * 요청 중인 경우
         */
        if (updateLoading) {
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
            const tf = confirm("입력한 내용으로 수정하시겠어요?");

            if (tf) {
                try {
                    await upd({
                        variables: { id, content: comment.value }
                    });
                    /**
                     * 댓글 랜더링 상태 변경
                     */
                    setContentState(comment.value);
                    /**
                     * 수정 모드 해제
                     */
                    setActive(false);
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
    }, [updateLoading, comment.value]);
    /**
     * 댓글 삭제 핸들러
     */
    const handleDelete = useCallback(async () => {
        /**
         * 요청 중인 경우
         */
        if (deleteLoading) {
            return alert("요청 중입니다. 잠시만 기다려주세요.");
        }

        const tf = confirm("댓글을 삭제하시겠어요?");

        if (tf) {
            try {
                await del({
                    variables: { id }
                });
                /**
                 * 컴포넌트 비활성화
                 */
                setDisabled(true);
                /**
                 * 수정 모드 해제
                 */
                setActive(false);
            } catch (error) {
                const { message } = JSON.parse(error.message);
                alert(message);
            }
        }
    }, []);

    return (
        <li className={`${displayName}`}>
            {(updateLoading || deleteLoading) && <Loader />}
            <div className={`${displayName}__info`}>
                <Avatar src={user.avatar.url} size="50" userId={user.id} />
                <span>{user.nickname}</span>
                <span>·</span>
                <span>{timeForToday(createdAt)}</span>
                {isMyComment && (
                    <div className={`${displayName}__extension`}>
                        <Dropdown
                            id={`dropdown_${id}`}
                            disabled={disabled}
                            list={[
                                {
                                    type: "item",
                                    text: "수정",
                                    handler: handleActive
                                },
                                {
                                    type: "divider"
                                },
                                {
                                    type: "item",
                                    text: "삭제",
                                    handler: handleDelete
                                }
                            ]}
                        />
                    </div>
                )}
            </div>
            {active ? (
                <>
                    <FormTextArea
                        placeholder="댓글을 입력하세요."
                        id="update_comment"
                        autoComplete="off"
                        height={100}
                        label="댓글"
                        {...comment}
                    />
                    <div className={`${displayName}__submit`}>
                        <Button onClick={handleCancel}>취소</Button>
                        <Button onClick={handleUpdate}>댓글 수정</Button>
                    </div>
                </>
            ) : (
                <pre>
                    {disabled ? <em>삭제된 댓글입니다.</em> : contentState}
                </pre>
            )}
        </li>
    );
};

export default memo(CommentItem);
