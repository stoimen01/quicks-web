
export interface Connect {
    kind: "connect"
    after?: number
    url: string
}

export interface Disconnect {
    kind: "disconnect"
}

export interface SendMsg {
    kind: "send-msg"
    msg: any
}

export type WsCommand = Connect | Disconnect | SendMsg
