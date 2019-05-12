
export interface SignUpClient {
    signUp(username: string, email: string, password: string): Promise<string>
}

export interface SignInClient {
    signIn(email: string, password: string): Promise<string>
}

export interface QuicksClientConfig {
    signInUrl: string,
    signUpUrl: string
}

class QuicksClient implements SignUpClient, SignInClient {

    constructor(
        private config: QuicksClientConfig
    ) {}

    getIceServers(bla: (servers: RTCConfiguration) => any) {
        /*let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
                let res = JSON.parse(xhr.responseText);
                console.log("response: ", res);
                bla({iceServers: [res.v.iceServers]})
            }
        };
        xhr.open("GET", this.baseUrl, true);
        xhr.send();*/
    }

    signUp(username: string, email: string, password: string): Promise<string> {
        return this.fetchText(this.config.signUpUrl, {
            username: username,
            email: email,
            password: password
        })
    }

    signIn(email: string, password: string): Promise<string> {
        return this.fetchText(this.config.signInUrl, {
            email: email,
            password: password
        })
    }

    private fetchText(url: string, body: any): Promise<string> {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.ok) {
                return response.text()
            }
            throw new Error('Network response was not ok.');
        })
    }

}

export default QuicksClient;