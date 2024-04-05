type ArrowFunction = (...args: any[]) => any;

export function isAsync(originalFunction: ArrowFunction): boolean {
    if ((originalFunction as any)[Symbol.toStringTag] === 'AsyncFunction') {
        return true;
    }
    if (originalFunction.constructor.name === 'AsyncFunction') {
        return true;
    }
    if (originalFunction.toString().includes('async ')) {
        return true;
    }
    return false;
}
