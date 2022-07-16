import React from "react";

/**
 * * Default svg size
 */
const size = 24;

/**
 * Thumbnail icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Thumbnail = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        viewBox="0 0 24 24"
        width={size}
        height={size}
    >
        <path d="M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z" />
    </svg>
);

/**
 * Thumbnail icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Arrow = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        className="activeEscape"
        viewBox="0 0 24 24"
    >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
);

/**
 * Heart empty icon component
 *
 * @param props.style Svg style
 */
export const HeartEmpty = () => (
    <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="crimson"
        className="activeEscape"
        viewBox="0 0 24 24"
    >
        <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
    </svg>
);

/**
 * Heart full icon component
 *
 * @param props.style Svg style
 */
export const HeartFull = () => (
    <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="crimson"
        className="activeEscape"
        viewBox="0 0 24 24"
    >
        <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
    </svg>
);

/**
 * Comment icon component
 *
 * @Img
 * @param props.style style
 */
export const Comment = ({ style }) => (
    <svg
        style={style}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
    >
        <path d="M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75" />
    </svg>
);

/**
 * More icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const More = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
    </svg>
);

/**
 * Upload icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Upload = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M10 9h-6l8-9 8 9h-6v11h-4v-11zm11 11v2h-18v-2h-2v4h22v-4h-2z" />
    </svg>
);

/**
 * Bell icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Bell = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z" />
    </svg>
);

/**
 * Next icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Next = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
);

/**
 * Add icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Add = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z" />
    </svg>
);

/**
 * AddPost icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const AddPost = ({ style }) => (
    <svg
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
    >
        <g>
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path>
        </g>
    </svg>
);

/**
 * Profile icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Profile = ({ style }) => (
    <svg viewBox="0 0 15 18.9" width={size} height={size} style={style}>
        <path d="M7.5 8.8c2.6 0 4.7-2 4.7-4.4S10.1 0 7.5 0 2.8 2 2.8 4.4C2.9 6.8 5 8.8 7.5 8.8zm0 1.5c-4.2 0-7.5 3.2-7.5 7.4 0 .6.5 1.2 1.2 1.2h12.6c.7 0 1.2-.5 1.2-1.2 0-4.1-3.3-7.4-7.5-7.4z"></path>
    </svg>
);

/**
 * Search icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Search = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        style={style}
        viewBox="0 0 24 24"
    >
        <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
    </svg>
);

/**
 * MinimizeSearch icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const MinimizeSearch = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        style={style}
        viewBox="0 0 24 24"
    >
        <path d="M13 10h-8v-2h8v2zm8.172 14l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
    </svg>
);

/**
 * Filter icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Filter = ({ style }) => (
    <svg
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        width={size}
        height={size}
        style={style}
    >
        <g>
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
        </g>
    </svg>
);

/**
 * Collapse icon component
 *
 * @Svg
 * @param props.style Svg style
 */
export const Collapse = ({ style }) => (
    <svg
        width={size}
        height={size}
        style={style}
        version="1.1"
        viewBox="0 0 20 20"
        x="0px"
        y="0px"
    >
        <g>
            <path d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"></path>
        </g>
    </svg>
);

/**
 * Home icon component
 *
 * @Img
 * @param props.style style
 */
export const Home = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        style={style}
        viewBox="0 0 24 24"
    >
        <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z" />
    </svg>
);

/**
 * View icon component
 *
 * @Img
 * @param props.style style
 */
export const View = ({ style }) => (
    <img
        src={require("./img/eye.svg")}
        alt="view icon"
        style={style}
        width={size}
        height={size}
    />
);

/**
 * Trash icon component
 *
 * @Img
 * @param props.style style
 */
export const Trash = ({ style }) => (
    <img
        src={require("./img/trash.svg")}
        alt="trash icon"
        style={style}
        width={size}
        height={size}
    />
);

/**
 * Modify icon component
 *
 * @Img
 * @param props.style style
 */
export const Modify = ({ style }) => (
    <img
        src={require("./img/modify.svg")}
        alt="modify icon"
        style={style}
        width={size}
        height={size}
    />
);

/**
 * Notice icon component
 *
 * @Img
 * @param props.style style
 */
export const Notice = ({ style }) => (
    <img
        src={require("./img/speaker.svg")}
        alt="notice icon"
        style={style}
        width={size}
        height={size}
    />
);

/**
 * Logout icon component
 *
 * @Img
 * @param props.style style
 */
export const Logout = ({ style }) => (
    <img
        src={require("./img/logout.svg")}
        alt="logout icon"
        style={style}
        width={size}
        height={size}
    />
);

/**
 * Close icon component
 *
 * @param props.style style
 */
export const Close = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
    </svg>
);
