
export interface Connected {
    kind: "connected"
}

export interface Disconnected {
    kind: "disconnected"
}

export interface Failed {
    kind: "failed"
}

export interface MessageReceived {
    kind: "message-received"
    msg: any
}

export type WsEvent = Connected | Disconnected | Failed | MessageReceived