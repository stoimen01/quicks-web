
class QuicksClient {

    constructor(
        public url: string
    ) {}

    getIceServers(bla: (servers: RTCConfiguration) => any) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
                let res = JSON.parse(xhr.responseText);
                console.log("response: ", res);
                bla({iceServers: [res.v.iceServers]})
            }
        };
        xhr.open("GET", this.url, true);
        xhr.send();
    }
}

export default QuicksClient;