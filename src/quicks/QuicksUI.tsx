import React from 'react';
import {assertNever, MviComponent, MviProps} from "../mvi";
import {QuicksState} from "./QuicksState";
import {QuicksEvent} from "./QuicksEvent";

interface QuicksProps extends MviProps<QuicksState, QuicksEvent> {
    buildEntry: () => JSX.Element,
    buildIndoor: (token: string) => JSX.Element
}

class QuicksUI extends MviComponent<QuicksProps, QuicksState> {

    constructor(props: QuicksProps) {
        super(props);
    }

    render() {
        let mainElement;
        switch (this.state.kind) {
            case "entry":
                mainElement = this.props.buildEntry();
                break;
            case "indoor":
                mainElement = this.props.buildIndoor(this.state.wsUrl);
                break;
            default: assertNever(this.state);
        }

        return mainElement;
    }

}

export default QuicksUI;

//private readonly remoteVideo = React.createRef<any>();

//const quicksClient = new QuicksClientOld("http://localhost:8080/ice");
//const wsClient = new WsClientOld("ws://localhost:8080/ws");
//let rtcAgent = new RtcAgent();
//const rtcManager = new RtcManager(quicksClient, wsClient, rtcAgent);

/*rtcManager.start((event) => {
    console.log("STREAM BABY");
    console.log(event);
    this.remoteVideo.current.srcObject = event.stream;
})*/

/*<div className="App">
    <h1>QuicksUI</h1>
    <input type="range" min="0" max="100" step="1" value="50" onChange={this.onVerticalSliderChange}/>
    <input type="range" min="0" max="100" step="1" value="50" onChange={this.onHorizontalSliderChange}/>
    <Button variant="contained" color="primary">
        Hello world
    </Button>
    <div id="videos">
        <video ref={this.remoteVideo} autoPlay playsInline/>
    </div>
</div>*/
