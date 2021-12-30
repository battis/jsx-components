export default interface Comparable<T> {
    equals<T>(other: T): boolean;

    compareTo<T>(other: T): number;
}

export function instanceOfComparable<T>(obj: any): obj is Comparable<T> {
    return (
        obj &&
        'equals' in obj &&
        typeof obj.equals === 'function' &&
        'compareTo' in obj &&
        typeof obj.compareTo === 'function'
    );
}
