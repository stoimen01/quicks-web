export interface Entry {
    kind: "entry"
}

export interface Indoor {
    kind: "indoor"
    token: string
    wsUrl: string
}

export type QuicksState = Entry | Indoor