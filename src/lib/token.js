export const decodeBase64Jwt = (token) => {
    const base64Url = token.split(".")[1];

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map((c) => `%${c.charCodeAt(0).toString(16).slice(-2)}`)
            .join("")
    );

    return JSON.parse(jsonPayload);
};
