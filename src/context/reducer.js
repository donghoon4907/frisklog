import {
    SET_ME,
    SHOW_NOTICE_MODAL,
    HIDE_NOTICE_MODAL,
    SHOW_POST_MODAL,
    HIDE_POST_MODAL,
    SHOW_LOGIN_MODAL,
    HIDE_LOGIN_MODAL,
    SHOW_SEARCH_BAR,
    HIDE_SEARCH_BAR,
    SHOW_FILTER_BAR,
    HIDE_FILTER_BAR,
    SEARCH_POST,
    EXPAND_NAVIGATION,
    CONTRACT_NAVIGATION,
    // SET_IS_MOBILE,
    SET_BREAKPOINT
} from "./action";

/**
 * 로컬 상태 관리 모듈
 *
 * @param state {*} 상태
 * @param action {*} 액션
 */
export default function reducer(state, action) {
    switch (action.type) {
        case SET_ME:
            return {
                ...state,
                id: action.id,
                nickname: action.nickname,
                email: action.email,
                avatar: action.avatar,
                isMaster: action.isMaster
            };
        case SHOW_NOTICE_MODAL:
            return {
                ...state,
                isShowNoticeModal: true,
                activeNotice: {
                    id: action.id,
                    action: action.action,
                    actionText: action.actionText,
                    title: action.title,
                    description: action.description
                }
            };
        case HIDE_NOTICE_MODAL:
            return {
                ...state,
                isShowNoticeModal: false,
                activeNotice: {
                    id: "",
                    action: "wait",
                    actionText: "비활성화",
                    title: "",
                    description: ""
                }
            };

        case SHOW_SEARCH_BAR:
            return {
                ...state,
                isShowSearchBar: true
            };
        case HIDE_SEARCH_BAR:
            return {
                ...state,
                isShowSearchBar: false
            };
        case SHOW_FILTER_BAR:
            return {
                ...state,
                isShowFilterBar: true
            };
        case HIDE_FILTER_BAR:
            return {
                ...state,
                isShowFilterBar: false
            };
        case SHOW_LOGIN_MODAL:
            return {
                ...state,
                isShowLoginModal: true
            };
        case HIDE_LOGIN_MODAL:
            return {
                ...state,
                isShowLoginModal: false
            };
        case SHOW_POST_MODAL:
            return {
                ...state,
                isShowAddPostModal: true
            };
        case HIDE_POST_MODAL:
            return {
                ...state,
                isShowAddPostModal: false
            };
        case SEARCH_POST:
            return {
                ...state,
                searchPostOption: {
                    orderBy:
                        "orderBy" in action
                            ? action.orderBy
                            : state.searchPostOption.orderBy,
                    query:
                        "query" in action
                            ? action.query
                            : state.searchPostOption.query,
                    filter:
                        "filter" in action
                            ? action.filter
                            : state.searchPostOption.filter
                }
            };
        case EXPAND_NAVIGATION:
            return {
                ...state,
                isCollapseNav: "expand"
            };
        case CONTRACT_NAVIGATION:
            return {
                ...state,
                isCollapseNav: "contract"
            };
        // case SET_IS_MOBILE:
        //     return {
        //         ...state,
        //         isMobile: action.payload
        //     };
        case SET_BREAKPOINT:
            return {
                ...state,
                breakpoint: action.breakpoint,
                slidesToShow: action.slidesToShow
            };
        default:
            return { ...state };
    }
}
