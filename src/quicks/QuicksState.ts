export interface Entry {
    kind: "entry"
}

export interface Indoor {
    kind: "indoor"
}

export type QuicksState = Entry | Indoor