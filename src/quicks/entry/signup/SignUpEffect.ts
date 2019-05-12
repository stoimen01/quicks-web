export interface SignIn {
    kind: "sign-in";
}

export interface SignUp {
    kind: "sign-up";
    username: string,
    email: string,
    password: string
}

export type SignUpEffect = SignIn | SignUp;