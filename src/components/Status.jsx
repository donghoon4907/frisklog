import React from "react";

export const displayName = "fr-status";

export const Badge = ({ status }) => (
    <span className={`${displayName} ${displayName}--${status}`}></span>
);

export const Text = ({ children }) => (
    <span className={`${displayName}__text`}>{children}</span>
);
