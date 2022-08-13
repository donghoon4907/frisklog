import React, { useCallback, memo } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { CREATE_ROOM } from "../../graphql/mutation/room";
import { graphqlError } from "../../lib/error";
import { useDispatch } from "../../context";
import { getStorage, TOKEN_KEY } from "../../lib/cookie";
import { SHOW_LOGIN_MODAL } from "../../context/action";
import Button from ".";

/**
 * 팔로우 버튼 컴포넌트
 *
 * @param {string}   props.userId       사용자 ID
 * @param {object[]} props.followers    팔로워 목록
 */
const CreateRoomBtn = ({ userId }) => {
    const history = useHistory();

    const dispatch = useDispatch();
    // 팔로우
    const [create, { loading }] = useMutation(CREATE_ROOM);
    // 클릭 핸들러
    const handleClick = useCallback(async () => {
        if (loading) {
            return alert("요청 중입니다");
        }
        // 로그인 체크
        const token = getStorage(TOKEN_KEY);

        if (token === null) {
            return dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }

        try {
            const {
                data: { addRoom }
            } = await create({ variables: { userId } });

            history.push(`/room/${addRoom.id}`);
        } catch (error) {
            graphqlError({ error, dispatch });
        }
    }, [userId, loading]);

    return (
        <div className="fr-btn__wrapper" title="메세지 보내기 버튼">
            <Button
                type="button"
                onClick={handleClick}
                className="fr-btn--primary"
                aria-label="메세지 보내기"
            >
                메세지 보내기
            </Button>
        </div>
    );
};

export default memo(CreateRoomBtn);
