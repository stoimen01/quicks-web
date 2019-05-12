import QuicksClient from "../QuicksClient";
import {WsClient} from "../WsClient";
import {RtcAgent} from "./RtcAgent";

export class RtcManager {

    constructor(
        private quicksClient: QuicksClient,
        private wsClient: WsClient,
        private rtcAgent: RtcAgent
    ){}

    start(onStream: (stream: any) => void) {
        const {quicksClient, rtcAgent, wsClient} = this;

        quicksClient.getIceServers( (servers: any) => {

            rtcAgent.createPeerConnection(servers, {
                onIceCandidate: (event: any) => {
                    if (event.candidate) {
                        console.log("SENDING ICE CANDIDATE");
                        wsClient.sendMsg({
                            type: 'candidate',
                            label: event.candidate.sdpMLineIndex,
                            id: event.candidate.sdpMid,
                            candidate: event.candidate.candidate
                        });
                    }
                },
                onLocalDesc: (desc: any) => {
                    console.log("SENDING OFFER");
                    wsClient.sendMsg(desc);
                },
                onStream: (event: any) => {
                    onStream(event);
                }
            });

            wsClient.subscribe((message) => {
                let type = message.type;
                if (type === 'answer') {
                    console.log('RECEIVED ANSWER.');
                    rtcAgent.onAnswer(message)
                } else if (type === 'candidate') {
                    console.log('RECEIVED CANDIDATE.');
                    rtcAgent.onIceCandidate(message)
                }
            });

            //rtcAgent.createOffer()
        });
    }

}
