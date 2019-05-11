import {Observable, Subject, Subscription} from "rxjs";
import {flatMap, map, scan, startWith, takeUntil} from "rxjs/operators";
import * as React from "react";

export type Source<T> = Observable<T>;

export interface Sink<T> {
    accept(value: T): void
}

export interface ReduceResult<S, F> {
    state: S,
    effects: Array<F>
}

export class SinkSubject<T> implements Sink<T>{

    constructor(private subject: Subject<T>) {
    }

    accept(value: T): void {
        this.subject.next(value);
    }
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
            scan<E, ReduceResult<S, F>>(reducer , initResult),
            startWith(initResult)
        );

        // stop emitting effects when the UI unsubscribes
        let effectsCleaner = new Subject();

        this.statesOut = new Observable(observer => {

            const subscription = resultOut
                .pipe(map(result => result.state))
                .subscribe(observer);

            return () => {
                subscription.unsubscribe();
                effectsCleaner.next({});
                effectsCleaner.complete()
            }
        });

        this.effectsOut = resultOut.pipe(
            flatMap(result => result.effects),
            takeUntil(effectsCleaner)
        );

        this.eventsIn = new SinkSubject(eventsIn);
    }

}

export interface MviProps<S, E> {
    source: Source<S>
    sink: Sink<E>
}

export abstract class MviComponent <P extends MviProps<S, any>, S> extends React.Component<P, S> {

    private subscription: Subscription;

    protected constructor(props: P) {
        super(props);
        this.subscription = props.source.subscribe(state => {
            if (this.state == null) {
                this.state = state
            } else {
                this.setState(state)
            }
        });
    }

    componentWillUnmount(): void {
        this.subscription.unsubscribe()
    }
}

export function assertNever(x: any): never {
    throw new Error("Unexpected object: " + x);
}