import {
    SET_ME,
    // SHOW_NOTICE_MODAL,
    // HIDE_NOTICE_MODAL,
    SHOW_POST_MODAL,
    HIDE_POST_MODAL,
    SHOW_LOGIN_MODAL,
    HIDE_LOGIN_MODAL,
    SHOW_SEARCH_BAR,
    HIDE_SEARCH_BAR,
    // SHOW_FILTER_BAR,
    // HIDE_FILTER_BAR,
    SEARCH_POST,
    // EXPAND_NAVIGATION,
    // CONTRACT_NAVIGATION,
    // SET_IS_MOBILE,
    SET_BREAKPOINT,
    SET_UPLOADED_URL,
    SHOW_USER_MODAL,
    HIDE_USER_MODAL
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
                id: action.id ? action.id : state.id,
                nickname: action.nickname ? action.nickname : state.nickname,
                email: action.email ? action.email : state.email,
                avatar: action.avatar ? action.avatar : state.avatar,
                isMaster: action.isMaster ? action.isMaster : state.isMaster
            };
        // case SHOW_NOTICE_MODAL:
        //     return {
        //         ...state,
        //         isShowNoticeModal: true,
        //         activeNotice: {
        //             id: action.id,
        //             action: action.action,
        //             actionText: action.actionText,
        //             title: action.title,
        //             description: action.description
        //         }
        //     };
        // case HIDE_NOTICE_MODAL:
        //     return {
        //         ...state,
        //         isShowNoticeModal: false,
        //         activeNotice: {
        //             id: "",
        //             action: "wait",
        //             actionText: "비활성화",
        //             title: "",
        //             description: ""
        //         }
        //     };

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
        // case SHOW_FILTER_BAR:
        //     return {
        //         ...state,
        //         isShowFilterBar: true
        //     };
        // case HIDE_FILTER_BAR:
        //     return {
        //         ...state,
        //         isShowFilterBar: false
        //     };
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
                isShowPostModal: true,
                activePost: {
                    id: action.id ? action.id : "",
                    content: action.content ? action.content : "",
                    category: action.category ? action.category : ""
                }
            };
        case HIDE_POST_MODAL:
            return {
                ...state,
                isShowPostModal: false,
                activePost: {
                    id: "",
                    content: "",
                    category: ""
                }
            };
        case SEARCH_POST:
            return {
                ...state,
                searchPostOption: {
                    activeId: action.activeId,
                    isLike: action.isLike
                }
            };
        // case SEARCH_POST:
        //     return {
        //         ...state,
        //         searchPostOption: {
        //             orderBy:
        //                 "orderBy" in action
        //                     ? action.orderBy
        //                     : state.searchPostOption.orderBy,
        //             query:
        //                 "query" in action
        //                     ? action.query
        //                     : state.searchPostOption.query,
        //             filter:
        //                 "filter" in action
        //                     ? action.filter
        //                     : state.searchPostOption.filter
        //         }
        //     };
        // case EXPAND_NAVIGATION:
        //     return {
        //         ...state,
        //         isCollapseNav: "expand"
        //     };
        // case CONTRACT_NAVIGATION:
        //     return {
        //         ...state,
        //         isCollapseNav: "contract"
        //     };
        // case SET_IS_MOBILE:
        //     return {
        //         ...state,
        //         isMobile: action.payload
        //     };
        case SET_BREAKPOINT:
            return {
                ...state,
                breakpoint: action.breakpoint
                // slidesToShow: action.slidesToShow
            };
        case SET_UPLOADED_URL:
            return {
                ...state,
                uploadedUrl: action.uploadedUrl
                // slidesToShow: action.slidesToShow
            };
        case SHOW_USER_MODAL:
            return {
                ...state,
                isShowUserModal: true
            };
        case HIDE_USER_MODAL:
            return {
                ...state,
                isShowUserModal: false
            };
        // case SHOW_POST_DROPDOWN:
        //     return {
        //         ...state,
        //         isShowPostDropdown: true,
        //         activeDropdown: {
        //             offsetX: action.offsetX,
        //             offsetY: action.offsetY
        //         }
        //     };
        // case HIDE_POST_DROPDOWN:
        //     return {
        //         ...state,
        //         isShowPostDropdown: false,
        //         activeDropdown: {
        //             offsetX: -1,
        //             offsetY: -1
        //         }
        //     };
        default:
            return { ...state };
    }
}
