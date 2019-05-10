import React, {Component} from 'react';
import QuicksClient from "./remote/QuicksClient";
import {RtcAgent} from "./remote/rtc/RtcAgent";
import {WsClient} from "./remote/WsClient";
import {RtcManager} from "./remote/rtc/RtcManager";

interface P {
}

interface S {
}

class Quicks extends Component<P, S> {

    private readonly localVideo = React.createRef<any>();
    private readonly remoteVideo = React.createRef<any>();

    constructor(props: P) {
        super(props);

        const quicksClient = new QuicksClient("http://localhost:8080/ice");
        const wsClient = new WsClient("ws://localhost:8080/ws");
        let rtcAgent = new RtcAgent();
        const rtcManager = new RtcManager(quicksClient, wsClient, rtcAgent);

        rtcManager.start((event) => {
            console.log("STREAM BABY");
            console.log(event);
            this.remoteVideo.current.srcObject = event.stream;
        })
    }

    render() {
       /* let core = new EntryCore();
        return (
            <EntryUI sink={core.eventsIn} source={core.statesOut}/>
        );*/
        return <div className="App">
            <h1>Realtime communication with WebRTC</h1>
            <div id="videos">
                <video ref={this.localVideo} autoPlay muted playsInline/>
                <video ref={this.remoteVideo} autoPlay playsInline/>
            </div>
        </div>
    }

}

export default Quicks;
