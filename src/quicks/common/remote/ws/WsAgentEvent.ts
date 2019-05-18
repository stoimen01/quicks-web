
export interface MessageReceived {
    kind: "message-received"
    msg: any
}

export type WsAgentEvent = MessageReceived