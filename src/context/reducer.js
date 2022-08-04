import {
    SET_ME,
    LOGOUT_USER,
    SHOW_POST_MODAL,
    HIDE_POST_MODAL,
    SHOW_LOGIN_MODAL,
    HIDE_LOGIN_MODAL,
    SHOW_SEARCH_BAR,
    HIDE_SEARCH_BAR,
    SEARCH_POST,
    SET_UPLOADED_URL,
    SHOW_USER_MODAL,
    HIDE_USER_MODAL,
    SET_THEME
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
                id: action.id !== undefined ? action.id : state.id,
                nickname:
                    action.nickname !== undefined
                        ? action.nickname
                        : state.nickname,
                email: action.email !== undefined ? action.email : state.email,
                avatar:
                    action.avatar !== undefined ? action.avatar : state.avatar,
                isMaster:
                    action.isMaster !== undefined
                        ? action.isMaster
                        : state.isMaster
            };
        case LOGOUT_USER:
            return {
                ...state,
                id: null,
                nickname: null,
                email: null,
                avatar: null,
                isMaster: false
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
                    categories: action.categories ? action.categories : []
                }
            };
        case HIDE_POST_MODAL:
            return {
                ...state,
                isShowPostModal: false,
                activePost: {
                    id: "",
                    content: "",
                    categories: []
                }
            };
        case SEARCH_POST:
            return {
                ...state,
                searchPostOption: {
                    activeId: action.activeId,
                    title: action.title,
                    isLike: action.isLike,
                    isFollowing: action.isFollowing
                }
            };
        case SET_UPLOADED_URL:
            return {
                ...state,
                uploadedUrl: action.uploadedUrl
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
        case SET_THEME:
            return {
                ...state,
                theme: action.theme
            };
        default:
            return { ...state };
    }
}
