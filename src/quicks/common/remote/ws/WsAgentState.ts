
export interface Connected {
    kind: "connected"
}

export interface Connecting {
    kind: "connecting"
}

export type WsAgentState = Connected | Connecting
