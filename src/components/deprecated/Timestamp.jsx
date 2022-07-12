import React from "react";

/**
 * * 공통 타임스탬프 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Timestamp = ({ children }) => (
    <time className="fr-timestamp">{children}</time>
);

export default Timestamp;
