export interface NameChanged {
    kind: "name-changed";
    username: string
}

export interface EmailChanged {
    kind: "email-changed";
    email: string
}

export interface PasswordChanged {
    kind: "password-changed";
    password: string
}

export interface SignInClicked {
    kind: "sign-in-clicked";
}

export interface SignUpClicked {
    kind: "sign-up-clicked";
}

export interface SignUpFailed {
    kind: "sign-up-failed"
}

export type SignUpEvent =
    SignInClicked | SignUpClicked |
    NameChanged | PasswordChanged | EmailChanged | SignUpFailed;