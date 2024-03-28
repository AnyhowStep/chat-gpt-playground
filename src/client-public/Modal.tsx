import * as React from "react";
import * as classNames from "classnames";
import { Portal, portalContainer } from "./Portal";

export interface ModalProps {
    children : React.ReactNode,
}

export function Modal (props : ModalProps) {
    const {
        children,
    } = props;

    return <Portal>
        <div
            className="ui dimmer modals page active"
        >
            <div
                className={classNames(
                    "ui modal active",
                )}
            >
                {children}
            </div>
        </div>
    </Portal>
}

let dimCount = 0;
const dimObserver = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
        if (mutation.type != "childList") {
            continue;
        }
        for (let i=0; i<mutation.addedNodes.length; ++i) {
            const n = mutation.addedNodes.item(i);
            const ele = (n as HTMLElement);
            if (ele?.classList?.contains("dimmer") && ele.classList.contains("active")) {
                ++dimCount;
            }
        }
        for (let i=0; i<mutation.removedNodes.length; ++i) {
            const n = mutation.removedNodes.item(i);
            const ele = (n as HTMLElement);
            if (ele?.classList?.contains("dimmer") && ele.classList.contains("active")) {
                --dimCount;
            }
        }
    }

    if (dimCount <= 0) {
        document.body.classList.remove("dimmed");
    } else {
        document.body.classList.add("dimmed");
    }
});
dimObserver.observe(portalContainer, {
    subtree : true,
    childList : true,
})