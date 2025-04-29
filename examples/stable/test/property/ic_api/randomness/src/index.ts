import { IDL, randSeed, update } from 'azle';

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

export default class {
    @update([IDL.Text, IDL.Nat32], IDL.Vec(IDL.Nat8))
    cryptoGetRandomValuesForType(
        typedArrayName: TypedArrayName,
        length: number
    ): Uint8Array {
        let array:
            | Int8Array
            | Uint8Array
            | Uint8ClampedArray
            | Int16Array
            | Uint16Array
            | Int32Array
            | Uint32Array
            | BigInt64Array
            | BigUint64Array;

        switch (typedArrayName) {
            case 'Int8Array':
                array = new Int8Array(length);
                break;
            case 'Uint8Array':
                array = new Uint8Array(length);
                break;
            case 'Uint8ClampedArray':
                array = new Uint8ClampedArray(length);
                break;
            case 'Int16Array':
                array = new Int16Array(length);
                break;
            case 'Uint16Array':
                array = new Uint16Array(length);
                break;
            case 'Int32Array':
                array = new Int32Array(length);
                break;
            case 'Uint32Array':
                array = new Uint32Array(length);
                break;
            case 'BigInt64Array':
                array = new BigInt64Array(length);
                break;
            case 'BigUint64Array':
                array = new BigUint64Array(length);
                break;
            default:
                throw new Error(`Unsupported TypedArray: ${typedArrayName}`);
        }

        crypto.getRandomValues(array);

        // Return the underlying buffer as Uint8Array for Candid compatibility
        return new Uint8Array(array.buffer);
    }

    @update([IDL.Vec(IDL.Nat8)])
    seed(seed: Uint8Array): void {
        randSeed(seed);
    }
}
