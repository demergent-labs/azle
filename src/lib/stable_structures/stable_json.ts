import { Serializable } from './stable_b_tree_map';
import { Principal } from '../candid/types/reference/principal';

export function StableJson(options?: {
    replacer?: typeof jsonReplacer;
    reviver?: typeof jsonReviver;
}): Serializable {
    return {
        toBytes(data: any) {
            const result = JSON.stringify(
                data,
                options?.replacer ?? jsonReplacer
            );

            return Uint8Array.from(Buffer.from(result));
        },
        fromBytes(bytes: Uint8Array) {
            return JSON.parse(
                Buffer.from(bytes).toString(),
                options?.reviver ?? jsonReviver
            );
        }
    };
}

export const stableJson = StableJson();

export function jsonReplacer(_key: string, value: any): any {
    if (typeof value === 'bigint') {
        return {
            __bigint__: value.toString()
        };
    }

    if (
        typeof value === 'object' &&
        value !== null &&
        value._isPrincipal === true
    ) {
        return {
            __principal__: value.toString()
        };
    }

    if (typeof value === 'number' && isNaN(value)) {
        return {
            __nan__: '__nan__'
        };
    }

    if (typeof value === 'number' && value === Infinity) {
        return {
            __infinity__: '__infinity__'
        };
    }

    if (typeof value === 'number' && value === -Infinity) {
        return {
            __negative_infinity__: '__negative_infinity__'
        };
    }

    if (value instanceof Int8Array) {
        return {
            __int8array__: Array.from(value)
        };
    }

    if (value instanceof Int16Array) {
        return {
            __int16array__: Array.from(value)
        };
    }

    if (value instanceof Int32Array) {
        return {
            __int32array__: Array.from(value)
        };
    }

    if (value instanceof BigInt64Array) {
        return {
            __bigint64array__: Array.from(value)
        };
    }

    if (value instanceof Uint8Array) {
        return {
            __uint8array__: Array.from(value)
        };
    }

    if (value instanceof Uint16Array) {
        return {
            __uint16array__: Array.from(value)
        };
    }

    if (value instanceof Uint32Array) {
        return {
            __uint32array__: Array.from(value)
        };
    }

    if (value instanceof BigUint64Array) {
        return {
            __biguint64array__: Array.from(value)
        };
    }

    return value;
}

export function jsonReviver(_key: string, value: any): any {
    if (typeof value === 'object' && value !== null) {
        if (typeof value.__bigint__ === 'string') {
            return BigInt(value.__bigint__);
        }

        if (typeof value.__principal__ === 'string') {
            return Principal.fromText(value.__principal__);
        }

        if (value.__nan__ === '__nan__') {
            return NaN;
        }

        if (value.__infinity__ === '__infinity__') {
            return Infinity;
        }

        if (value.__negative_infinity__ === '__negative_infinity__') {
            return -Infinity;
        }

        if (typeof value.__int8array__ === 'object') {
            return Int8Array.from(value.__int8array__);
        }

        if (typeof value.__int16array__ === 'object') {
            return Int16Array.from(value.__int16array__);
        }

        if (typeof value.__int32array__ === 'object') {
            return Int32Array.from(value.__int32array__);
        }

        if (typeof value.__bigint64array__ === 'object') {
            return BigInt64Array.from(value.__bigint64array__);
        }

        if (typeof value.__uint8array__ === 'object') {
            return Uint8Array.from(value.__uint8array__);
        }

        if (typeof value.__uint16array__ === 'object') {
            return Uint16Array.from(value.__uint16array__);
        }

        if (typeof value.__uint32array__ === 'object') {
            return Uint32Array.from(value.__uint32array__);
        }

        if (typeof value.__biguint64array__ === 'object') {
            return BigUint64Array.from(value.__biguint64array__);
        }
    }

    return value;
}
