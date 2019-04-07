
export interface SignIn {
    kind: "sign-in"
}

export interface SignUp {
    kind: "sign-up"
}

export type EntryState = SignIn | SignUp