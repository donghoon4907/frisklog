import React, { useCallback } from "react";
import { useDispatch } from "../../context";
import { SHOW_NOTICE_MODAL } from "../../context/action";
import { GET_NOTICES } from "../../graphql/query/notice";
import { Notice } from "../../assets/icon";
import Query from "../Query";

/**
 * 공지사항 컴포넌트
 *
 * @Component
 * @author frisk
 * @deprecated
 */
const HeaderNotice = () => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 클릭 핸들러
     */
    const handleClick = useCallback(({ title, description, id }) => {
        dispatch({
            type: SHOW_NOTICE_MODAL,
            action: "readonly",
            id,
            actionText: "",
            title,
            description
        });
    }, []);

    return (
        <div className="fr-header__notice">
            <Query
                query={GET_NOTICES}
                variables={{
                    first: 1,
                    orderBy: "createdAt_DESC"
                }}
            >
                {({ data: { notices } }) =>
                    notices.map((notice) => (
                        <div key={notice.id}>
                            <Notice />
                            <u
                                onClick={() => handleClick(notice)}
                                role="link"
                                tabIndex="0"
                            >
                                {notice.title}
                            </u>
                        </div>
                    ))
                }
            </Query>
        </div>
    );
};

export default HeaderNotice;
