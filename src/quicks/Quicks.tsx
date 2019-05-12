import React from 'react';
import {assertNever, MviComponent, MviProps} from "../mvi";
import IndoorUI from "./indoor/IndoorUI";
import {EntryBuilder} from "./entry/EntryBuilder";
import {IndoorCore} from "./indoor/IndoorCore";
import {IndoorShell} from "./indoor/IndoorShell";
import {QuicksState} from "./QuicksState";
import {QuicksEvent} from "./QuicksEvent";

interface QuicksProps extends MviProps<QuicksState, QuicksEvent>{
    entryBuilder: EntryBuilder
}

class Quicks extends MviComponent<QuicksProps, QuicksState> {

    constructor(props: QuicksProps) {
        super(props);
    }

    render() {
        let mainElement;
        switch (this.state.kind) {
            case "entry":
                mainElement = this.props.entryBuilder.build();
                break;
            case "indoor":
                let shell = new IndoorShell(new IndoorCore(), "tokeen");
                mainElement = <IndoorUI events={shell.events} states={shell.states}/>;
                break;
            default: assertNever(this.state);
        }

        return mainElement;
    }

}

export default Quicks;

//private readonly remoteVideo = React.createRef<any>();

//const quicksClient = new QuicksClient("http://localhost:8080/ice");
//const wsClient = new WsClient("ws://localhost:8080/ws");
//let rtcAgent = new RtcAgent();
//const rtcManager = new RtcManager(quicksClient, wsClient, rtcAgent);

/*rtcManager.start((event) => {
    console.log("STREAM BABY");
    console.log(event);
    this.remoteVideo.current.srcObject = event.stream;
})*/

/*<div className="App">
    <h1>Quicks</h1>
    <input type="range" min="0" max="100" step="1" value="50" onChange={this.onVerticalSliderChange}/>
    <input type="range" min="0" max="100" step="1" value="50" onChange={this.onHorizontalSliderChange}/>
    <Button variant="contained" color="primary">
        Hello world
    </Button>
    <div id="videos">
        <video ref={this.remoteVideo} autoPlay playsInline/>
    </div>
</div>*/
