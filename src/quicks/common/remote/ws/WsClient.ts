import {Sink, Source} from "../../../../mvi";
import {WsCommand} from "./WsCommand";
import {WsEvent} from "./WsEvent";

export interface WsClient {
    commands: Sink<WsCommand>
    events: Source<WsEvent>
}