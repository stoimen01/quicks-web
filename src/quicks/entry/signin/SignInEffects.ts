export interface SignIn {
    kind: "sign-in";
    email: string,
    password: string
}

export interface SignUp {
    kind: "sign-up";
}

export type SignInEffect = SignIn | SignUp;