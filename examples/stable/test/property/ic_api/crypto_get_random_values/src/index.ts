import { IDL, update } from 'azle';

type TypedArrayName =
    | 'Int8Array'
    | 'Uint8Array'
    | 'Uint8ClampedArray'
    | 'Int16Array'
    | 'Uint16Array'
    | 'Int32Array'
    | 'Uint32Array'
    | 'BigInt64Array'
    | 'BigUint64Array';

type TypedArrayConstructor =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | BigInt64Array
    | BigUint64Array;

export default class {
    @update([IDL.Text, IDL.Nat32], IDL.Vec(IDL.Nat8))
    cryptoGetRandomValues(
        typedArrayName: TypedArrayName,
        length: number
    ): Uint8Array {
        let array = createTypedArray(typedArrayName, length);

        crypto.getRandomValues(array);

        // Return the underlying buffer as Uint8Array for Candid compatibility
        return new Uint8Array(array.buffer);
    }
}

function createTypedArray(
    typedArrayName: TypedArrayName,
    length: number
): TypedArrayConstructor {
    if (typedArrayName === 'Int8Array') return new Int8Array(length);
    if (typedArrayName === 'Uint8Array') return new Uint8Array(length);
    if (typedArrayName === 'Uint8ClampedArray')
        return new Uint8ClampedArray(length);
    if (typedArrayName === 'Int16Array') return new Int16Array(length);
    if (typedArrayName === 'Uint16Array') return new Uint16Array(length);
    if (typedArrayName === 'Int32Array') return new Int32Array(length);
    if (typedArrayName === 'Uint32Array') return new Uint32Array(length);
    if (typedArrayName === 'BigInt64Array') return new BigInt64Array(length);
    if (typedArrayName === 'BigUint64Array') return new BigUint64Array(length);
    throw new Error(`Unsupported TypedArray: ${typedArrayName}`);
}
