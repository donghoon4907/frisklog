import React from "react";

import Image from "./Image";

export const displayName = "fr-userlist";

export const Container = ({ children }) => (
    <li className={`${displayName}`}>{children}</li>
);

export const Body = ({ children }) => (
    <div className={`${displayName}__body`}>{children}</div>
);

export const Avatar = ({ src, status }) => (
    <div className={`${displayName}__avatar`}>
        <Image src={src} alt="Avatar" status={status} />
    </div>
);

export const Meta = ({ nickname, children }) => (
    <div className={`${displayName}__meta`}>
        {nickname && (
            <div className={`${displayName}__name`}>
                <span>{nickname}</span>
            </div>
        )}
        {children && (
            <div className={`${displayName}__description`}>{children}</div>
        )}
    </div>
);

export const Adjust = ({ children }) => (
    <div className={`${displayName}__adjust`}>{children}</div>
);
