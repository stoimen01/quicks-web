import {Observable, Subject, Subscription} from "rxjs";
import {map, scan, startWith, tap} from "rxjs/operators";
import * as React from "react";

export type Source<T> = Observable<T>;

export interface Sink<T> {
    accept(value: T): void
}

export class SinkSubject<T> implements Sink<T>{

    constructor(private subject: Subject<T>) {}

    accept(value: T): void {
        this.subject.next(value);
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

export interface CoreResult<S, F> {
    state: S,
    effects: Array<F>
}

export type Core <S, E, F> = (lastResult: CoreResult<S, F>, event: E) => CoreResult<S, F>;

export abstract class Shell <S, E, F> {

    public readonly events: Sink<E>;
    public readonly states: Source<S>;
    protected subs: Subscription = new Subscription();

    protected constructor(
        protected initResult: CoreResult<S, F>,
        core: Core<S,E,F>
    ) {
        let eventsIn = new Subject<E>();

        let resultOut = eventsIn.pipe(
            scan<E, CoreResult<S, F>>(core , initResult),
            startWith(initResult),
            tap(result => {
                result.effects.forEach((e) => {
                    this.onEffect(e)
                })
            })
        );

        // creating new observable to be able to
        // clean up resources once state stops being observed
        this.states = new Observable(observer => {

            this.subs.add(resultOut
                .pipe(map(result => result.state))
                .subscribe(observer));

            return () => {
                this.subs.unsubscribe();
            }
        });

        this.events = new SinkSubject(eventsIn);
    }

    protected abstract onEffect(effect: F): void
}

export function assertNever(x: any): never {
    throw new Error("Unexpected object: " + x);
}