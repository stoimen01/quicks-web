import {OnSignIn, OnSignUp} from "./signin/SignInEvent";

export interface OnSignIn {
    kind: "on-sign-in";
}

export interface OnSignInSuccess {
    kind: "on-sign-in-success"
}

export interface OnSignUp {
    kind: "on-sign-up";
}

export interface OnSignUpSuccess {
    kind: "on-sign-up-success"
}

export type EntryEvent =
    OnSignIn | OnSignUp |
    OnSignInSuccess | OnSignUpSuccess