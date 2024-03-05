import * as React from "react";
import {Link} from "react-router-dom";

export interface ErrorMessageProps {
    error : {
        messages : string[],
        type : "warning"|"negative",
    }
}
export function ErrorMessage (props : ErrorMessageProps) {
    const {error} = props;

    if (error.messages.length == 0) {
        return <div className="ui hidden message"></div>;
    } else {
        return (
            <div className={"ui icon message " + error.type} style={{ display : "flex" }}>
                <i className="exclamation triangle icon"></i>
                <div className="content">
                    <div className="header">{error.type == "warning" ? "Warning" : "Error"}</div>
                    <ul className="list">
                        {
                            error.messages.map(
                                (message, i) => <li key={i}>{message}</li>
                            )
                        }
                        {
                            error.messages.some(msg => msg.startsWith("no such")) ?
                            <li>
                                <Link to={"/"}>
                                    Maybe peforming a local data update on the Home page will help
                                </Link>
                            </li> :
                            undefined
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
