export default interface Comparable<T> {
    equals<T>(other: T): boolean;
    compareTo<T>(other: T): number;
}
export declare function instanceOfComparable<T>(obj: any): obj is Comparable<T>;
