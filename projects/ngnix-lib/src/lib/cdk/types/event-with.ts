export interface FullyTypedEventTarget<E> {
    addEventListener(
        type: string,
        listener: ((evt: E) => void) | null,
        options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener(
        type: string,
        listener?: ((evt: E) => void) | null,
        options?: boolean | EventListenerOptions,
    ): void;
}

/**
 *  Add typings to target and currentTarget {@link Event}.
 */
export type TypedEventWith<E extends Event, T extends FullyTypedEventTarget<E>> = E & {
    readonly currentTarget: T;
};
