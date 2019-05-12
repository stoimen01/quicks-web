export interface SignedIn {
    kind: "signed-in";
    token: string
}

export interface SignedUp {
    kind: "signed-up";
    token: string
}

export type QuicksEvent = SignedIn | SignedUp