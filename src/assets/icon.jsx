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
export const HeartEmpty = ({ style }) => (
    <svg
        width={size}
        height={size}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
    >
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
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
 * Remove icon component
 *
 * @param props.style style
 */
export const Remove = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
    </svg>
);

/**
 * Modify icon component
 *
 * @param props.style style
 */
export const Modify = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M4.5.257l3.771 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.771-3.77c-.172.584-.258 1.188-.258 1.792 0 1.602.607 3.202 1.83 4.426 1.351 1.351 3.164 1.958 4.931 1.821.933-.072 1.852.269 2.514.931l9.662 9.662c.578.578 1.337.868 2.097.868 1.661 0 3.001-1.364 2.966-3.03-.016-.737-.306-1.47-.868-2.033l-9.662-9.663c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.83-4.428-1.83-.603 0-1.207.086-1.791.257zm17.5 20.743c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z" />
    </svg>
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

/**
 * Favorite icon component
 *
 * @param props.style style
 */
export const Favorite = ({ style }) => (
    <svg
        clipRule="evenodd"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
            fillRule="nonzero"
        />
    </svg>
);

/**
 * Error icon component
 *
 * @param props.style style
 */
export const Error = ({ style }) => (
    <svg
        clipRule="evenodd"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
            fillRule="nonzero"
        />
    </svg>
);

/**
 * Github icon component
 *
 * @param props.style style
 */
export const Github = ({ style }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        width={size}
        height={size}
        className="activeEscape"
        viewBox="0 0 24 24"
    >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);
