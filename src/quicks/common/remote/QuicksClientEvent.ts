interface SignedUp {
    kind: "signed-up"
    token: string
}

interface SignUpFailed {
    kind: "sign-up-failed"
}

interface SignedIn {
    kind: "signed-in"
    token: string
}

interface SignInFailed {
    kind: "sign-in-failed"
}

export type QuicksClientEvent = SignedUp | SignedIn | SignInFailed | SignUpFailed