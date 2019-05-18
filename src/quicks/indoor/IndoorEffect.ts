
export interface Connect {
    kind: 'connect'
    after?: number
}

export interface Disconnect {
    kind: "disconnect"
}

export type IndoorEffect = Connect | Disconnect