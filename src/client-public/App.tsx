import * as React from "react";
import {useDropdown} from "./use-dropdown";
import {HashRouter, Switch, Route, Link} from "react-router-dom";
//import {DefaultMenu} from "./DefaultMenu";

import {HomePage} from "./HomePage";
//import { Conversation, Story } from "./route";
import { OpenAiApi } from "../api-openai";
import { DefaultMenu } from "./DefaultMenu";
import { ApiKeyPage } from "./ApiKeyPage";
import { FunctionToolListPage } from "./FunctionToolListPage";
import { FunctionToolEditPage } from "./FunctionToolEditPage";
import { ConversationListPage } from "./ConversationListPage";
import { ConversationEditPage } from "./ConversationEditPage";
import { ModelListPage } from "./ModelListPage";
import { SelfDiscoverListPage } from "./self-discover/SelfDiscoverListPage";
import { SelfDiscoverEditPage } from "./self-discover/SelfDiscoverEditPage";
// import { SchemaListPage } from "./hierarchical-generation/SchemaListPage";
// import { SchemaEditPage } from "./hierarchical-generation/SchemaEditPage";
// import { GraphListPage } from "./hierarchical-generation/GraphListPage";
// import { GraphEditPage } from "./hierarchical-generation/GraphEditPage";
// import { AgendaEditPage } from "./agenda/AgendaEditPage";
// import { AgendaListPage } from "./agenda/AgendaListPage";
import { FileEditPage } from "./prolog";
import { ProjectListPage } from "./prolog/ProjectListPage";
import { ProjectEditPage } from "./prolog/ProjectEditPage";
import { TestsPage } from "./text-adventure";


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
                <div className="item">
                    Settings
                    <div className="menu">
                        <Link className="ui item" to={`/api-key`}>API Key</Link>
                        <Link className="ui item" to={`/function-tool`}>Function Tools</Link>
                        <Link className="ui item" to={`/model`}>Models</Link>
                        <Link className="ui item" to={`/conversation`}>Conversations</Link>
                        <Link className="ui item" to={`/self-discover`}>Self-Discovers</Link>
                        {/* <Link className="ui item" to={`/agenda`}>Agendas</Link> */}
                    </div>
                </div>
                {/* <div className="item">
                    Hierarchical Generation
                    <div className="menu">
                        <Link className="ui item" to={`/schema`}>Schemas</Link>
                        <Link className="ui item" to={`/graph`}>Graphs</Link>
                    </div>
                </div> */}
                <div className="item">
                    Prolog
                    <div className="menu">
                        <Link className="ui item" to={`/prolog/project`}>Projects</Link>
                        <a className="ui item" href="https://lpn.swi-prolog.org/" target="_blank" rel="noopener noreferrer">
                            Learn Prolog Now <i className="external alternate icon"></i>
                        </a>
                        <a className="ui item" href="https://www.metalevel.at/prolog" target="_blank" rel="noopener noreferrer">
                            The Power of Prolog <i className="external alternate icon"></i>
                        </a>
                    </div>
                </div>
                <div className="item">
                    Text Adventure
                    <div className="menu">
                        <Link className="ui item" to={`/text-adventure/tests`}>Tests</Link>
                    </div>
                </div>
            </div>
            <div className="" style={{height:"100%"}}>
                <DefaultMenu
                    sidebarHook={sidebar}
                />
                <Switch>
                    {/* <Route path="/story" component={storyComponent.current}/>
                    <Route path="/conversation" component={conversationComponent.current}/> */}

                    <Route path="/api-key" component={ApiKeyPage}/>
                    <Route path="/function-tool/:uuid/edit" component={FunctionToolEditPage}/>
                    <Route path="/function-tool" component={FunctionToolListPage}/>
                    <Route path="/model" component={() => <ModelListPage openAiApi={_props.openAiApi}/>}/>
                    <Route path="/conversation/:uuid/edit" component={() => <ConversationEditPage openAiApi={_props.openAiApi}/>}/>
                    <Route path="/conversation" component={ConversationListPage}/>
                    <Route path="/self-discover/:uuid/edit" component={() => <SelfDiscoverEditPage openAiApi={_props.openAiApi}/>}/>
                    <Route path="/self-discover" component={SelfDiscoverListPage}/>
                    {/* <Route path="/agenda/:uuid/edit" component={() => <AgendaEditPage openAiApi={_props.openAiApi}/>}/>
                    <Route path="/agenda" component={AgendaListPage}/> */}

                    {/* <Route path="/schema/:uuid/edit" component={SchemaEditPage}/>
                    <Route path="/schema" component={SchemaListPage}/>

                    <Route path="/graph/:uuid/edit" component={() => <GraphEditPage openAiApi={_props.openAiApi}/>}/>
                    <Route path="/graph" component={GraphListPage}/> */}

                    <Route path="/prolog/project/:uuid/edit" component={ProjectEditPage}/>
                    <Route path="/prolog/project" component={ProjectListPage}/>

                    <Route path="/prolog/file/:uuid/edit" component={FileEditPage}/>

                    <Route path="/text-adventure/tests" component={TestsPage}/>

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
