import {WsClient} from "./WsClient";
import {WsEvent} from "./WsEvent";
import {Sink, SinkSubject, Source} from "../../../../mvi";
import {WsCommand} from "./WsCommand";
import {Subject} from "rxjs";

export class WsClientImpl implements WsClient {

    commands: Sink<WsCommand>;
    events: Source<WsEvent>;

    private ws?: WebSocket;
    private timeout?: any;

    constructor() {
        let commandsIn = new Subject<WsCommand>();
        let eventsOut = new Subject<WsEvent>();

        commandsIn.subscribe(cmd => {
            switch (cmd.kind) {
                case "connect":
                    if (cmd.after) {
                        if (!this.timeout) {
                            console.log("reconnecting");
                            this.timeout = setTimeout(() => {
                                this.initWs(cmd.url, eventsOut);
                                this.timeout = undefined;
                            }, cmd.after * 1000);
                        }
                    } else {
                        this.initWs(cmd.url, eventsOut);
                    }
                    break;

                case "disconnect":
                    if (this.ws) {
                        this.ws.close();
                    }
                    break;

                case "send-msg":
                    if (this.ws) {
                        this.ws.send(JSON.stringify(cmd.msg));
                    }
                    break;
            }
        });

        this.events = eventsOut;
        this.commands = new SinkSubject(commandsIn);
    }

    private initWs(url: string, eventsOut: Subject<WsEvent>) {

        if (this.ws) {
            this.ws.close()
        }

        let ws = new WebSocket(url);
        ws.onopen = () => {
            eventsOut.next({
                kind: "connected"
            })
        };
        ws.onmessage = (ev) => {
            eventsOut.next({
                kind: "message-received",
                msg: ev.data
            })
        };
        ws.onerror = (ev) => {
            console.log(ev);
            eventsOut.next({
                kind: "failed"
            })
        };
        ws.onclose = (ev) => {
            console.log(ev);
            eventsOut.next({
                kind: "disconnected"
            })
        };
        this.ws = ws;
    }

}