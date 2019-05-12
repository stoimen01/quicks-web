export interface SignInClicked {
    kind: "sign-in-clicked";
}

export interface SignUpClicked {
    kind: "sign-up-clicked";
}

export type EntryEvent =
    SignInClicked | SignUpClicked