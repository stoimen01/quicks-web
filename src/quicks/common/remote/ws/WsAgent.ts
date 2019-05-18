import {Source} from "../../../../mvi";
import {WsAgentEvent} from "./WsAgentEvent";
import {WsAgentState} from "./WsAgentState";

export interface WsAgent {
    events: Source<WsAgentEvent>
    states: Source<WsAgentState>
    sendMsg(msg: any): void
}