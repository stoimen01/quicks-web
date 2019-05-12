import React, {Component} from 'react';
import {assertNever, Core, MviComponent, MviProps, ReduceResult} from "../mvi";
import Dashboard from "./indoor/IndoorUI";
import {EntryBuilder} from "./entry/EntryBuilder";

export interface SignedIn {
    kind: "signed-in"
}

export interface SignedUp {
    kind: "signed-up";
}

export type QuicksEvent = SignedIn | SignedUp

interface QuicksEffect {
}

interface QuicksProps extends MviProps<QuicksState, QuicksEvent>{
    entryBuilder: EntryBuilder
}

interface Entry {
    kind: "entry"
}

interface Indoor {
    kind: "indoor"
}

type QuicksState = Entry | Indoor

const initState: Indoor = {
    kind: "indoor"
};

const reducer = (lastResult: ReduceResult<QuicksState, QuicksEffect>, event: QuicksEvent) => {
    let result: ReduceResult<QuicksState, QuicksEffect>;
    switch (event.kind) {
        case "signed-in":
            result = {
                state: {
                    kind: "indoor"
                },
                effects: []
            };
            return result;
        case "signed-up":
            result = {
                state: {
                    kind: "indoor"
                },
                effects: []
            };
            return result;
        default:
            return assertNever(event)
    }
};

export class QuicksCore extends Core<QuicksState, QuicksEvent, QuicksEffect> {
    constructor() {
        super(initState, [], reducer)
    }
}

class Quicks extends MviComponent<QuicksProps, QuicksState> {

    //private readonly remoteVideo = React.createRef<any>();

    constructor(props: QuicksProps) {
        super(props);

        //const quicksClient = new QuicksClient("http://localhost:8080/ice");
        //const wsClient = new WsClient("ws://localhost:8080/ws");
        //let rtcAgent = new RtcAgent();
        //const rtcManager = new RtcManager(quicksClient, wsClient, rtcAgent);

        /*rtcManager.start((event) => {
            console.log("STREAM BABY");
            console.log(event);
            this.remoteVideo.current.srcObject = event.stream;
        })*/
    }

    render() {
        let mainElement;
        switch (this.state.kind) {
            case "entry":
                mainElement = this.props.entryBuilder.build();
                break;
            case "indoor":
                mainElement = <Dashboard/>;
                break;
            default: assertNever(this.state);
        }

        return mainElement;

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
    }

}

export default Quicks;
