export type StringOrNothing = OrNothing<string>;

export type OrNothing<T> = T | undefined | null;