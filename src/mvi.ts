import {Observable, Subject} from "rxjs";
import {flatMap, map, scan} from "rxjs/operators";

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

export abstract class Core <S, E, F> {

    public readonly eventsIn: Sink<E>;

    public readonly statesOut: Source<S>;
    public readonly effectsOut: Source<F>;

    protected constructor(
        initState: S,
        initEffects: Array<F>,
        reducer: (lastResult: ReduceResult<S, F>, event: E) => ReduceResult<S, F>
    ) {

        let initResult: ReduceResult<S, F> = {
            state: initState,
            effects: initEffects
        };

        let eventsIn = new Subject<E>();

        let resultOut = eventsIn.pipe(
            scan<E, ReduceResult<S, F>>(reducer , initResult)
        );

        this.statesOut = resultOut.pipe(
            map(result => result.state)
        );

        this.effectsOut = resultOut.pipe(
            flatMap(result => result.effects)
        );

        this.eventsIn = new SinkSubject(eventsIn);
    }

}

export function assertNever(x: any): never {
    throw new Error("Unexpected object: " + x);
}