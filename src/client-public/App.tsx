import * as React from "react";
import {useDropdown} from "./use-dropdown";
import {HashRouter, Switch, Route, Link} from "react-router-dom";
//import {DefaultMenu} from "./DefaultMenu";

import {HomePage} from "./HomePage";
//import { Conversation, Story } from "./route";
import { OpenAiApi } from "../api-openai";
import { DefaultMenu } from "./DefaultMenu";


export interface Props {
    openAiApi : OpenAiApi,
}
export interface State {
}
export function App (_props : Props) {
    const sidebar = useDropdown({
        openClassName : "uncover visible",
        closeClassName : "uncover animating",
    });

    // const storyComponent = React.useRef(() => <Story openAiApi={props.openAiApi}/>);
    // const conversationComponent = React.useRef(() => <Conversation openAiApi={props.openAiApi}/>);

    return (
        <HashRouter>
            <div id="main-sidebar" className={sidebar.className("ui sidebar inverted vertical massive menu left overlay")}>
                <Link className="item" to="/">
                    Home
                </Link>
                <div className="item">
                    Lists
                    <div className="menu">
                        <Link className="ui item" to={`/list`}>All Lists</Link>
                    </div>
                </div>
                <div className="item">
                    Search
                    <div className="menu">
                        {/* <Link className="ui item" to={(location) => {
                            return `/search${QueryUtil.pickSearch(
                                location.search,
                                "searchId",
                                "atVersion",
                                "rowsPerPage"
                            )}`;
                        }}>
                            Search
                        </Link>
                        <Link className="ui item" to={(location) => {
                            return `/randomizer-1p${QueryUtil.pickSearch(
                                location.search,
                                "atVersion"
                            )}`;
                        }}>
                            Randomizer 1P
                        </Link>
                        <Link className="ui item" to={(location) => {
                            return `/randomizer-2p${QueryUtil.pickSearch(
                                location.search,
                                "atVersion"
                            )}`;
                        }}>
                            Randomizer 2P
                        </Link>
                        {/* TODO Properly credit NXI for the idea * /}
                        <Link className="ui item" to={(location) => {
                            return `/staircase-challenge${QueryUtil.pickSearch(
                                location.search,
                                "atVersion"
                            )}`;
                        }}>
                            Staircase Challenge
                        </Link> */}
                        {/* <Link className="ui item" to={`/search/preset`}>
                            Presets
                        </Link> */}
                    </div>
                </div>
                {/* <div className="item">
                    Articles
                    <div className="menu">
                        <Link className="ui item" to={`/to-do`}>TODO</Link>
                    </div>
                </div> */}
            </div>
            <div className="" style={{height:"100%"}}>
                <DefaultMenu
                    sidebarHook={sidebar}
                />
                <Switch>
                    {/* <Route path="/story" component={storyComponent.current}/>
                    <Route path="/conversation" component={conversationComponent.current}/> */}

                    <Route path="/" component={HomePage}/>
                </Switch>
                {/*<div className="ui vertical footer segment">
                    <div className="ui center aligned container">
                        <div className="ui stackable grid">
                            <div className="sixteen wide column">
                                <h4 className="ui header">Made with <i className="heart icon"></i></h4>
                                <p>
                                    -TODO- Add Credits
                                </p>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
        </HashRouter>
    );
}
