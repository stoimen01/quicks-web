import {Observable} from "rxjs";

class WsClient {

    constructor(
        public url: string //"ws://localhost:8080/ws"
    ) {}

    connect(): Observable<string> {
        return new Observable(subscriber => {
            const sock = new WebSocket(this.url);

            sock.onopen = function() {
                console.log('open');
                sock.send('test');
                subscriber.next("Connected !")
            };

            sock.onmessage = function(e) {
                console.log('message', e.data);
                subscriber.next(e.data);
                sock.close();
            };

            sock.onerror = function(e) {
                console.log('error:' + e);
                subscriber.error(e)
            };

            sock.onclose = function() {
                console.log('close');
                subscriber.complete()
            };
        })
    }

}