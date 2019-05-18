export interface SignedIn {
    kind: "signed-in"
    token: string
    wsUrl: string
}

export interface SignedUp {
    kind: "signed-up"
    token: string
    wsUrl: string
}

export type QuicksEvent = SignedIn | SignedUp