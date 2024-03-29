import React, { useReducer, useContext, createContext } from "react";
import reducer from "./reducer";

const Context = createContext(null);

const DispatchContext = createContext(null);

/**
 * 로컬 상태
 *
 * @property id                       - 사용자 ID
 * @property nickname                 - 사용자 별칭
 * @property email                    - 사용자 이메일
 * @property avatar                   - 사용자 프로필 사진
 * @property isMaster                 - 운영자 여부
 * @property isShowPostModal          - 게시물 추가 팝업 보이기 여부
 * @property isShowSearchBar          - 검색바 보이기 여부
 * @property isShowLoginModal         - 로그인 팝업 보이기 여부
 * @property activePost               - 선택한 게시물 정보
 * @property breakpoint               - 브레이크 포인트
 * @property slidesToShow             - 캐러셀 노출 아이템 수
 * @property isShowPostDropdown       - 포스트 드롭다운 보이기 여부
 * @property uploadedUrl              - 업로드된 이미지 url
 * @property isShowUserModal          - 내 정보 수정 팝업 보이기 여부
 */
const initialState = {
    id: null,
    nickname: null,
    email: null,
    avatar: null,
    isMaster: false,
    theme: "light",
    isShowPostModal: false,
    isShowSearchBar: false,
    isShowLoginModal: false,
    isShowPostDropdown: false,
    breakpoint: "wd",
    uploadedUrl: null,
    slidesToShow: 1,
    activePost: {
        id: "",
        content: "",
        categories: []
    },
    searchPostOption: {
        activeId: 1,
        title: "나의 포스트",
        isLike: false,
        isFollowing: false
    },
    isShowUserModal: false
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
