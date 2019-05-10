
export interface RtcListener {
    onIceCandidate: (event:any) => void,
    onLocalDesc: (desc: any) => void,
    onStream: (event: any) => void
}

export class RtcAgent {

    private pc: any;
    private listener: any;

    createPeerConnection = (config: RTCConfiguration, listener: RtcListener) => {
        this.listener = listener;
        try {
            this.pc = new RTCPeerConnection(config);

            this.pc.onicecandidate = (event: any) => {
                this.listener.onIceCandidate(event);
            };

            this.pc.onaddstream = (event: any) => {
                this.listener.onStream(event);
            };

            this.pc.onremovestream = (event: any) => {
                console.log('ON REMOVE STREAM');
            };
        } catch (e) {
            console.log('Failed to create PeerConnection, exception: ' + e.message);
            console.log('Cannot create RTCPeerConnection object.');
            return;
        }
    };

    createOffer() {
        const constraints = {
            audio: true,
            video: true
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                this.pc.addStream(stream);
                this.pc.createDataChannel('DataBaby', null);
                this.pc.createOffer().then(
                    (sessionDescription: any) => {
                        this.pc.setLocalDescription(sessionDescription)
                            .then(() => {
                                this.listener.onLocalDesc(sessionDescription);
                            }, (err: any) => {
                                console.log('LOCAL DESC SET ERROR', err);
                            });
                    },
                    (err: any) => {
                        console.log('CREATE OFFER ERROR', err);
                    }
                );
            })
            .catch(function (e) {
                console.log('getUserMedia() error: ' + e.name);
            });
    }

    onAnswer(offer: any) {
        if (!this.pc) return;
        this.pc.setRemoteDescription(new RTCSessionDescription(offer))
            .then(() => {
                console.log("REMOTE DESCRIPTION SET")
            }, (err: any) => {
                console.log('REMOTE DESCRIPTION SET ERROR', err);
            });
    }

    onIceCandidate(json: any) {
        if (!this.pc) return;
        const candidate = new RTCIceCandidate({
            sdpMLineIndex: json.label,
            candidate: json.candidate
        });
        this.pc.addIceCandidate(candidate)
            .then(() => {
                console.log("ICE CANDIDATE SET")
            }, (err: any) => {
                console.log('ICE CANDIDATE SET ERROR', err);
            });
    }
}