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
                        wsClient.sendMsg(JSON.stringify({
                            type: 'candidate',
                            label: event.candidate.sdpMLineIndex,
                            id: event.candidate.sdpMid,
                            candidate: event.candidate.candidate
                        }));
                    }
                },
                onLocalDesc: (desc: any) => {
                    wsClient.sendMsg(JSON.stringify(desc));
                },
                onStream: (event: any) => {
                    onStream(event);
                }
            });

            wsClient.subscribe((message) => {
                console.log('Client received message:', message);
                let jsonData = JSON.parse(message.data);
                let type = jsonData.type;
                if (type === 'offer') {
                    console.log('Sending answer to peer.');
                    rtcAgent.onOffer(jsonData)
                } else if (type === 'answer') {
                    rtcAgent.onRemoteDesc(jsonData);
                } else if (type === 'candidate') {
                    rtcAgent.onIceCandidate(jsonData)
                }
            });

        });
    }

}
