export interface Connecting {
    kind: 'connecting'
}

export interface Connected {
    kind: 'connected'
}

export type IndoorState = Connected | Connecting