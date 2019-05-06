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
                console.log('icecandidate event: ', event);
                this.listener.onIceCandidate(event);
            };

            this.pc.onaddstream = (event: any) => {
                console.log('Remote stream added.');
                this.listener.onStream(event);
            };

            this.pc.onremovestream = (event: any) => {
                console.log('Remote stream removed. Event: ', event);
            };

            console.log('Created RTCPeerConnection');
        } catch (e) {
            console.log('Failed to create PeerConnection, exception: ' + e.message);
            console.log('Cannot create RTCPeerConnection object.');
            return;
        }
    };

    onOffer(offer: any) {
        this.pc.setRemoteDescription(new RTCSessionDescription(offer));
        this.pc.createAnswer().then(
            (sessionDescription: any) => {
                this.pc.setLocalDescription(sessionDescription);
                console.log('setLocalAndSendMessage sending message', sessionDescription);
                this.listener.onLocalDesc(sessionDescription);
            },
            (error: any) => {
                console.log('Failed to create session description: ' + error.toString());
            }
        );
    }

    onRemoteDesc(desc: any) {
        if (!this.pc) return;
        this.pc.setRemoteDescription(new RTCSessionDescription(desc));
    }

    onIceCandidate(json: any) {
        if (!this.pc) return;
        const candidate = new RTCIceCandidate({
            sdpMLineIndex: json.label,
            candidate: json.candidate
        });
        this.pc.addIceCandidate(candidate);
    }
}