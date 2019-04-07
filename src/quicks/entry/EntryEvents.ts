import {OnSignIn, OnSignUp} from "./signin/SignInEvent";

export interface OnSignIn {
    kind: "on-sign-in";
}

export interface OnSignUp {
    kind: "on-sign-up";
}

export type EntryEvent = OnSignIn | OnSignUp