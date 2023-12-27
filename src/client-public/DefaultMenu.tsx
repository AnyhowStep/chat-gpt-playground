import * as React from "react";
import {Route, RouteComponentProps} from "react-router-dom";
import {DropdownHook} from "./use-dropdown";

export interface DefaultMenuProps {
    sidebarHook : DropdownHook,
}
export function DefaultMenu (props : DefaultMenuProps) {
    const [searchInput, setSearchInput] = React.useState("");

    //const dropdownSearch = useDropdown({});

    return <Route render={({history} : RouteComponentProps<any>) => {
        //searchId, atVersion, rowsPerPage
        //atVersion
        //Convenience method to pick values, stringify and prepend "?" character

        /*const queryOnlyLanguageCode = {
            languageCode : query.languageCode,
        };*/

        const goToSearch = () => {
            if (/^\s*$/.test(searchInput)) {
                return;
            }
            history.push(`/search/title/${encodeURIComponent(searchInput)}`);
        };

        return (
            <div className="ui fixed inverted menu">
                <a
                    className="ui item header home-button"
                    onClick={props.sidebarHook.onClick}
                    onMouseOver={props.sidebarHook.onMouseOver}
                    ref={props.sidebarHook.ref}
                >
                    <span className="home-button-text">
                        <i className="bars icon"></i>
                    </span>
                    <span className="mini-home-button-text">
                        <i className="bars icon"></i>
                    </span>
                </a>
                {/*
                <div
                    className={dropdownSearch.className("ui dropdown item")}
                    onClick={dropdownSearch.onClick}
                    onMouseOver={dropdownSearch.onMouseOver}
                    ref={dropdownSearch.ref}
                >
                    Search
                    <div className="menu">
                        <Link className="ui item" to={`/search?${QueryUtil.toString({
                            atVersion : "125",
                            display : "CHART",
                            itemLink : "false",
                            randomize : "true",
                            rowsPerPage : "7",
                            layout : "COMPACT",
                            useProtectVeto : "true",
                            searchId : "N4Igzg9gdg5gYgSwDYBcCmAnA4hiBXABzBAC4BtUDNSPDAYzVJAGEBVAFRABoQUBPAoxIgAkgDkA%2BgBkRAZU48oaGAEN0pAGYqkYNDzp4UIgCbFyAJgC6AX0v6AFiowpEqTDnxFSFEFRr0hEAAlAEF2cSxuXgFA0LEsAFEopVV1Ei0dPRAAWwhjNBMzMgBGO181BFgisuzK0mKAdh5slQAPUnMABh4AN208am8yyrokPHyAERVYTE1tXWa8gtNzIZ4RscnpmExV9Pm0ay5KanwApikQgCEEqSj%2BQSZxaTkFEBS1IRQMAZ4kFQARmgkIVvMUAGxcADMABZoQBWMoQQQYCrQUHkGzHXynWgMJghAAKhISITizCSPAegWeMnkyWUnzmmV6mDACHRpjB5kRPGRmDRUAxZBsZXy6AwtSgCDAKAQdAA8hh8hhvGQQABZBUTSkgEKyZggOzqiYiOBwERsKTsACaUX1huNIHC7CkuodRq46uYYQSWAVQTtPA9TquhI19oNnvVWBCGoSEhEOrE4QtCSCkcdNiAA",
                        })}`}>
                            TBD 3D: Prime
                        </Link>
                    </div>
                </div>
                */}
                <div className="ui item" style={{
                    minWidth : "0px",
                    //maxWidth : "200px",
                    flex : 1,
                }}>
                    <form className="ui input" onSubmit={(e) => {
                        e.preventDefault();
                        goToSearch();
                    }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                        />
                    </form>
                </div>
            </div>
        );
    }}/>;
}
