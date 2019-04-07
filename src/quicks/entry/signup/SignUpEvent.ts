export interface OnSignIn {
    kind: "on-sign-in";
}

export interface OnSignUp {
    kind: "on-sign-up";
}

export interface OnNameChange {
    kind: "on-name-change";
    username: string
}

export interface OnPasswordChange {
    kind: "on-password-change";
    password: string
}

export interface OnEmailChange {
    kind: "on-email-change";
    email: string
}

export interface OnSignUpOk {
    kind: "on-sign-up-ok"
}

export interface OnSignUpError {
    kind: "on-sign-up-error"
}

export type SignUpEvent =
    OnSignIn | OnSignUp |
    OnNameChange | OnPasswordChange | OnEmailChange |
    OnSignUpOk | OnSignUpError;