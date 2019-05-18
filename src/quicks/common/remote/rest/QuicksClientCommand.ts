export interface SignIn {
    kind: "sign-in"
    email: string
    password: string
}

export interface SignUp {
    kind: "sign-up"
    username: string
    email: string
    password: string
}

export interface SignOut {
    kind: "sign-out"
    token: string
}

export type QuicksClientCommand = SignIn | SignUp | SignOut