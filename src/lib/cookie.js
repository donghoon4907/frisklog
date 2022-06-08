import Cookies from "js-cookie";

// 토큰 키
export const TOKEN_KEY = "token__frisklog";
// 네비게이션 확장 여부 키
export const COLLAPSE_KEY = "collapse__frisklog";

/**
 * Cookie getter
 *
 * @param {string} key cookie key
 */
export const getStorage = (key) => {
    let content = null;

    if (process.browser && Cookies.get(key)) {
        content = JSON.parse(Cookies.get(key));
    }

    return content;
};

/**
 * Cookie setter
 *
 * @param {string} key cookie key
 */
export const setStorage = (key, value) => {
    let isSet = false;

    if (process.browser) {
        Cookies.set(key, JSON.stringify(value), { expires: 365 });
        isSet = true;
    }

    return isSet;
};

/**
 * Cookie delete
 *
 * @param {string} key cookie key
 */
export const deleteStorage = (key) => {
    let isDelete = false;

    if (process.browser) {
        Cookies.remove(key);
        isDelete = true;
    }

    return isDelete;
};
