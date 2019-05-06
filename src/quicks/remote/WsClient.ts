import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {Subscription} from "rxjs";

export class WsClient {

    private ws: WebSocketSubject<any>;

    constructor(
        private url: string
    ){
        this.ws = webSocket<any>({
            url: this.url
        });
        this.initWs();
    }

    subscribe(listener: (msg: any) => void): Subscription {
        return this.ws.subscribe(listener);
    }

    sendMsg(msg: any) {
        this.ws.next(msg)
    }

    private initWs() {
        this.ws.subscribe(
            (err) => {
                console.log("WS ERROR :");
                console.log(err);
                setTimeout(() => {
                    console.log("WS RECONNECT");
                    this.initWs()
                }, 5000)
            },
            () => {
                console.log("WS COMPLETE");
                setTimeout(() => {
                    console.log("WS RECONNECT");
                    this.initWs()
                }, 5000)
            }
        )
    }

}