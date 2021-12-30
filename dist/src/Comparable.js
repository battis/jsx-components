"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfComparable = void 0;
function instanceOfComparable(obj) {
    return (obj &&
        'equals' in obj &&
        typeof obj.equals === 'function' &&
        'compareTo' in obj &&
        typeof obj.compareTo === 'function');
}
exports.instanceOfComparable = instanceOfComparable;
