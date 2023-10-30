export function createAreOptsEqualCodeDeclaration(): string {
    return `
            function calculateDepthAndValues(value: any): {
                depth: number;
                value: any;
            } {
                if (value.None === null) {
                    return { depth: 0, value: null };
                }
                if (value.Some === null || (value.Some.Some === undefined && value.Some.None === undefined)) {
                    // The value.Some is not an opt. return value.Some
                    return {depth: 0, value: JSON.stringify(value.Some, (key, value) => typeof value === 'bigint' ? value.toString() + "n" : value)}
                }

                const result = calculateDepthAndValues(value.Some);
                return { ...result, depth: result.depth + 1 };
            }

            function areOptsEqual(opt1: any, opt2: any) {
                const { depth: depth1, value: value1 } =
                    calculateDepthAndValues(opt1);
                const { depth: depth2, value: value2 } =
                    calculateDepthAndValues(opt2);

                return depth1 === depth2 && value1 === value2;
            }
        `;
}

export function createAreOptsEqualCodeUsage(
    paramName: string,
    paramValue: any
): string {
    //  TODO this only works because right now both a and b are strings when they are bigints. Try changing the areOptsEqual with deepEqual and you will see
    return `areOptsEqual(${paramName}, ${valueToSrc(paramValue)})`;
}

function stringifyBigInts(_key: any, value: any) {
    if (typeof value === 'bigint') {
        return value.toString() + 'n';
    }
    return value;
}

// NOTE: This is a little buggy but seems to work for opt (bigints are "123n" instead of 123n)
function valueToSrc(value: any): string {
    return JSON.stringify(value, stringifyBigInts);
}
