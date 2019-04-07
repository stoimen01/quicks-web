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

export interface OnSignInOk {
    kind: "on-sign-in-ok"
}

export interface OnSignInError {
    kind: "on-sign-in-error"
}

export type SignInEvent =
    OnSignIn | OnSignUp |
    OnNameChange | OnPasswordChange |
    OnSignInOk | OnSignInError;