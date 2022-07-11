import React, { useReducer, useContext, createContext } from "react";
import reducer from "./reducer";

const Context = createContext(null);

const DispatchContext = createContext(null);

/**
 * 로컬 상태
 *
 * @property id                 - 사용자 ID
 * @property nickname           - 사용자 별칭
 * @property email              - 사용자 이메일
 * @property avatar             - 사용자 프로필 사진
 * @property isMaster           - 운영자 여부
 * @deprecated isShowNoticeModal  - 공지사항 팝업 보이기 여부
 * @property isShowPostModal - 게시물 추가 팝업 보이기 여부
 * @property isShowSearchBar    - 검색바 보이기 여부
 * @deprecated isShowFilterBar    - 검색 필터 보이기 여부
 * @property isShowLoginModal   - 로그인 팝업 보이기 여부
 * @property activePost         - 선택한 게시물 정보
 * @deprecated activeNotice       - 선택한 공지사항 정보
 * @deprecated searchPostOption   - 검색 옵션
 * @deprecated isCollapseNav      - 네비게이션 확장상태 (expand, contract)
 * @deprecated isMobile           - 모바일 환경 여부
 * @property breakpoint         - 브레이크 포인트
 * @property slidesToShow       - 캐러셀 노출 아이템 수
 * @property isShowPostDropdown   - 포스트 드롭다운 보이기 여부
 * @property uploadedUrl          - 업로드된 이미지 url
 * @property isShowUserModal   - 내 정보 수정 팝업 보이기 여부
 */
const initialState = {
    id: null,
    nickname: null,
    email: null,
    avatar: null,
    isMaster: false,
    // isShowNoticeModal: false,
    isShowPostModal: false,
    isShowSearchBar: false,
    // isShowFilterBar: false,
    isShowLoginModal: false,
    isShowPostDropdown: false,
    // isCollapseNav: "contract",
    // isMobile: false, deprecated
    breakpoint: "wd",
    uploadedUrl: "",
    slidesToShow: 1,
    activePost: {
        id: "",
        content: "",
        category: ""
    },
    searchPostOption: {
        activeId: 1,
        isLike: false
    },
    isShowUserModal: false
    // activeDropdown: {
    //     offsetX: -1,
    //     offsetY: -1
    // }
    // activeNotice: {
    //     id: "",
    //     action: "wait",
    //     actionText: "비활성화",
    //     title: "",
    //     description: ""
    // },
    // feedPostOption: {},
};

/**
 * 로컬 상태 제공 컴포넌트
 *
 */
export function ContextProvider({ children, context }) {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        ...context
    });

    return (
        <Context.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </Context.Provider>
    );
}

/**
 * Hooks - 로컬 상태 감시
 *
 */
export function useSelector() {
    const state = useContext(Context);

    if (!state) {
        throw new Error("Provider is not defined");
    }

    return state;
}

/**
 * Hooks - 로컬 상태 변경
 *
 */
export function useDispatch() {
    const dispatch = useContext(DispatchContext);

    if (!dispatch) {
        throw new Error("Provider is not defined");
    }

    return dispatch;
}
