export type StringOrNothing = OrNothing<string>;

export type OrNothing<T> = T | undefined | null;

export function isNullOrUndefined(param: string | object | null | undefined): boolean {
    return param === undefined || param === null;
}

export function isNotEmptyArray<T>(param: T[]): boolean {
    return param && param.length > 0;
}
