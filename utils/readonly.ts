export type DeepReadonly<Type> = {
    readonly [Property in keyof Type]: DeepReadonly<Type[Property]>;
};

export type UTCDate = Readonly<Date>;
export type GUID = Readonly<string>;
export type OneOf<T, V> =
    | (T & Partial<Record<Exclude<keyof V, keyof T>, never>>)
    | (V & Partial<Record<Exclude<keyof T, keyof V>, never>>);