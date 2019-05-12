import {QuicksClient2} from "./QuicksClient2";
import {assertNever, Sink, SinkSubject, Source} from "../../../mvi";
import {QuicksClientCommand} from "./QuicksClientCommand";
import {QuicksClientEvent} from "./QuicksClientEvent";
import {Subject} from "rxjs";
import {QuicksClientConfig} from "./QuicksClient";

export class QuicksClientImpl implements QuicksClient2 {

    commands: Sink<QuicksClientCommand>;
    events: Source<QuicksClientEvent>;

    constructor(
        private config: QuicksClientConfig
    ) {

        let commandsIn = new Subject<QuicksClientCommand>();
        let eventsOut = new Subject<QuicksClientEvent>();

        commandsIn.subscribe(command => {
            switch (command.kind) {

                case "sign-in":
                    this.signIn(command.email, command.password)
                        .then(token => {
                            eventsOut.next({
                                kind: "signed-in",
                                token: token
                            });
                        })
                        .catch(reason => {
                            eventsOut.next({
                                kind: "sign-in-failed"
                            });
                            console.log("SIGN IN ERROR :");
                            console.log(reason);
                        });
                    break;

                case "sign-up":
                    this.signUp(command.username, command.email, command.password)
                        .then(token => {
                            eventsOut.next({
                                kind: "signed-up",
                                token: token
                            });
                        })
                        .catch(reason => {
                            eventsOut.next({
                                kind: "sign-up-failed"
                            });
                            console.log("SIGN UP ERROR :");
                            console.log(reason);
                        });
                    break;

                default:
                    assertNever(command)
            }
        });

        this.commands = new SinkSubject(commandsIn);
        this.events = eventsOut;
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