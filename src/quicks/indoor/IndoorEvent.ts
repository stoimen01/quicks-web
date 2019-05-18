
export interface SignOutClicked {
    kind: 'sign-out-clicked'
}

export interface Connected {
    kind: "connected"
}

export interface Connecting {
    kind: "connecting"
}

export type IndoorEvent = SignOutClicked | Connected | Connecting