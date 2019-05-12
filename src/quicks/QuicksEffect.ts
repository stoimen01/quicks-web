
export interface OpenConnection {
    kind: "open-connection"
}

export function openConnection(): OpenConnection {
    return {
        kind: "open-connection"
    }
}

export interface CloseConnection {
    kind: "close-connection"
}

export function closeConnection(): CloseConnection {
    return {
        kind: "close-connection"
    }
}

export type QuicksEffect = OpenConnection | CloseConnection



