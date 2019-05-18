interface SignedUp {
    kind: "signed-up"
    token: string
    wsUrl: string
}

interface SignUpFailed {
    kind: "sign-up-failed"
}

interface SignedIn {
    kind: "signed-in"
    token: string
    wsUrl: string
}

interface SignInFailed {
    kind: "sign-in-failed"
}

interface SignedOut {
    kind: "signed-out"
}

export type QuicksClientEvent =
    SignedUp | SignedIn | SignInFailed | SignUpFailed | SignedOut