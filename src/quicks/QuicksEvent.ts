export interface SignedIn {
    kind: "signed-in"
}

export interface SignedUp {
    kind: "signed-up"
}

export type QuicksEvent = SignedIn | SignedUp