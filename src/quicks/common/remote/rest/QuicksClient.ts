import {QuicksClientCommand} from "./QuicksClientCommand";
import {Sink, Source} from "../../../../mvi";
import {QuicksClientEvent} from "./QuicksClientEvent";

export interface QuicksClient {
    commands: Sink<QuicksClientCommand>
    events: Source<QuicksClientEvent>
}