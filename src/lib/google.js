import { decodeBase64Jwt } from "./token";

class GoogleAccounts {
    constructor(client_id, callback) {
        this.sdk = window.google.accounts.id;

        this.sdk.initialize({
            client_id,
            callback
        });
    }

    renderButton(el, { theme, size, text, width, type = "standard" }) {
        return this.sdk.renderButton(el, {
            theme,
            size,
            text,
            width,
            type
        });
    }

    getEmail(credential) {
        const { email } = decodeBase64Jwt(credential);

        return email;
    }

    getName(credential) {
        const { name } = decodeBase64Jwt(credential);

        return name;
    }
}

export default GoogleAccounts;
