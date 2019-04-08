import React, {Component} from 'react';
import './Quicks.css';
import EntryUI from "./entry/EntryUI";
import EntryCore from "./entry/EntryCore";

interface P {
}

interface S {
}

class Quicks extends Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    render() {
        let core = new EntryCore();
        return (
            <div className="App">
                <EntryUI sink={core.eventsIn} source={core.statesOut}/>
            </div>
        );
    }

}

export default Quicks;
