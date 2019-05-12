export interface Entry {
    kind: "entry"
}

export interface Indoor {
    kind: "indoor",
    token: string
}

export type QuicksState = Entry | Indoor