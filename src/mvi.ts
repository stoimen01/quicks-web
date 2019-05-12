import {Observable, Subject, Subscription} from "rxjs";
import {flatMap, map, publish, publishReplay, refCount, scan, shareReplay, startWith, takeUntil} from "rxjs/operators";
import * as React from "react";

export type Source<T> = Observable<T>;

export interface Sink<T> {
    accept(value: T): void
}

export interface CoreResult<S, F> {
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

export abstract class Shell <S, E, F> {

    public readonly events: Sink<E>;
    public readonly states: Source<S>;

    constructor(core: Core<S, E, F>) {
        this.events = core.events;
        this.states = core.states;
        core.effects.subscribe(e => {
            this.onEffect(e)
        })
    }

    abstract onEffect(effect: F): any
}


export abstract class Core <S, E, F> {

    public readonly events: Sink<E>;

    public readonly states: Source<S>;
    public readonly effects: Source<F>;

    protected constructor(
        initState: S,
        initEffects: Array<F>,
        reducer: (lastResult: CoreResult<S, F>, event: E) => CoreResult<S, F>
    ) {

        let initResult: CoreResult<S, F> = {
            state: initState,
            effects: initEffects
        };

        let eventsIn = new Subject<E>();

        let resultOut = eventsIn.pipe(
            scan<E, CoreResult<S, F>>(reducer , initResult),
            startWith(initResult)
        );

        // stop emitting effects when the UI unsubscribes
        let effectsCleaner = new Subject();

        this.states = new Observable(observer => {

            const subscription = resultOut
                .pipe(map(result => result.state))
                .subscribe(observer);

            return () => {
                subscription.unsubscribe();
                effectsCleaner.next({});
                effectsCleaner.complete()
            }
        });

        this.effects = resultOut.pipe(
            flatMap(result => result.effects),
            takeUntil(effectsCleaner)
        );

        this.events = new SinkSubject(eventsIn);
    }

}

export interface MviProps<S, E> {
    states: Source<S>
    events: Sink<E>
}

export abstract class MviComponent <P extends MviProps<S, any>, S> extends React.Component<P, S> {

    private subscription: Subscription;

    protected constructor(props: P) {
        super(props);
        this.subscription = props.states.subscribe(state => {
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