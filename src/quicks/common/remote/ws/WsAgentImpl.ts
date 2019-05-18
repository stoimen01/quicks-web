import {WsAgent} from "./WsAgent";
import {WsAgentEvent} from "./WsAgentEvent";
import {Source} from "../../../../mvi";

import {Subject} from "rxjs";
import {WsAgentState} from "./WsAgentState";
import {shareReplay, startWith} from "rxjs/operators";
import {QuicksClient} from "../rest/QuicksClient";

export class WsAgentImpl implements WsAgent {

    private eventsOut = new Subject<WsAgentEvent>();
    private statesOut = new Subject<WsAgentState>();

    events: Source<WsAgentEvent> = this.eventsOut;
    states: Source<WsAgentState> = this.statesOut.pipe(
        shareReplay(1)
    );

    private ws?: WebSocket;
    private isReconnecting: boolean = false;
    private isClosed: boolean = false;

    constructor(quicksClient: QuicksClient) {
        quicksClient.events.subscribe(ev => {
            switch (ev.kind) {
                case "signed-up":
                case "signed-in":
                    this.connect(ev.wsUrl);
                    this.isClosed = false;
                    break;
                case "signed-out":
                    if (this.ws) {
                        this.ws.close();
                    }
                    this.isClosed = true;
                    break;
            }
        });
    }

    sendMsg(msg: any): void {
        if (this.ws) {
            this.ws.send(JSON.stringify(msg));
        }
    }

    private connect(url: string) {

        let ws = new WebSocket(url);

        ws.onopen = () => {
            this.statesOut.next({
                kind: "connected"
            })
        };

        ws.onmessage = (ev) => {
            this.eventsOut.next({
                kind: "message-received",
                msg: ev.data
            })
        };

        ws.onerror = () => {
            console.log("WS ERROR");
            this.tryReconnect(url);

        };

        ws.onclose = () => {
            console.log("WS CLOSE");
            this.tryReconnect(url);
        };

        this.statesOut.next({
            kind: "connecting"
        });

        this.ws = ws;
    }

    private tryReconnect(url: string) {
        if (this.isClosed || this.isReconnecting) {
            return;
        }

        this.isReconnecting = true;
        setTimeout(() => {
            if (!this.isClosed) {
                this.connect(url);
            }
            this.isReconnecting = false;
        }, 3000)
    }

}