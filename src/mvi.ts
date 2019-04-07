import {Observable, Subject} from "rxjs";

export interface Sink<T> {
    accept(value: T): void
}

export type Source<T> = Observable<T>;

export class SinkSubject<T> implements Sink<T>{

    constructor(private subject: Subject<T>) {
    }

    accept(value: T): void {
        this.subject.next(value);
    }
}

export interface ReduceResult<S, F> {
    state: S,
    effects: Array<F>
}

export function assertNever(x: any): never {
    throw new Error("Unexpected object: " + x);
}