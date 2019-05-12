export interface SignInClicked {
    kind: "sign-in-clicked";
}

export interface SignUpClicked {
    kind: "sign-up-clicked";
}

export interface EmailChanged {
    kind: "email-changed";
    email: string
}

export interface PasswordChanged {
    kind: "password-changed";
    password: string
}

export interface SignInFailed {
    kind: "sign-in-failed"
}

export type SignInEvent =
    SignInClicked | SignUpClicked |
    EmailChanged | PasswordChanged | SignInFailed;