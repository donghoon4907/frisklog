import { getStorage, TOKEN_KEY } from "./cookie";
import { SHOW_LOGIN_MODAL, SET_ME } from "../context/action";

export const graphqlError = ({ error, dispatch }) => {
    alert(error.message);

    const token = getStorage(TOKEN_KEY);

    if (token === null) {
        dispatch({
            type: SET_ME,
            id: null,
            nickname: null,
            email: null,
            avatar: null,
            isMaster: false
        });

        dispatch({
            type: SHOW_LOGIN_MODAL
        });
    }
};
