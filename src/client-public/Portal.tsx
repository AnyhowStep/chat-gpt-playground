import * as React from "react";
import * as ReactDOM from "react-dom";

export interface PortalProps {
    children : React.ReactNode,
}

export const portalContainer = document.getElementById("portal")!;

export function Portal (props : PortalProps) {
    return ReactDOM.createPortal(
        props.children,
        portalContainer
    );
}