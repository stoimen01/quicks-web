
export interface SignOutClicked {
    kind: 'sign-out-clicked'
}

export interface Connected {
    kind: "connected"
}

export interface Disconnected {
    kind: "disconnected"
}

export interface Failed {
    kind: "failed"
}

export type IndoorEvent = SignOutClicked | Connected | Disconnected | Failed