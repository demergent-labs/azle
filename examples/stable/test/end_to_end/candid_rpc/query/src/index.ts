import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    simpleQuery(): string {
        const myUint8Array: Uint8Array<ArrayBuffer> = new Uint8Array([
            68, 73, 68, 76, 0, 0
        ]);
        const myArrayBuffer = myUint8Array.buffer;
        const mySharedArrayBuffer = new SharedArrayBuffer(6);
        const mySharedUint8Array: Uint8Array<SharedArrayBuffer> =
            new Uint8Array(mySharedArrayBuffer);
        mySharedUint8Array.set(myUint8Array);

        // @ts-ignore
        const decodedUint8Array = IDL.decode([], myUint8Array);
        console.log('decodedUint8Array', decodedUint8Array);
        // @ts-ignore
        const decodedArrayBuffer = IDL.decode([], myArrayBuffer);
        console.log('decodedArrayBuffer', decodedArrayBuffer);
        // @ts-ignore
        const decodedSharedUint8Array = IDL.decode([], mySharedUint8Array);
        console.log('decodedSharedUint8Array', decodedSharedUint8Array);
        // @ts-ignore
        const decodedSharedArrayBuffer = IDL.decode([], mySharedArrayBuffer);
        console.log('decodedSharedArrayBuffer', decodedSharedArrayBuffer);

        const myOtherUint8Array = IDL.encode([IDL.Text], ['Hello']);
        console.log('myOtherUint8Array', myOtherUint8Array);
        console.log(
            `most importantly the type of myOtherUint8Array is ${typeof myOtherUint8Array}`
        );
        console.log(
            "it's an instance of Uint8Array",
            myOtherUint8Array instanceof Uint8Array
        );
        console.log(
            "it's an instance of ArrayBuffer",
            myOtherUint8Array instanceof ArrayBuffer
        );
        return 'This is a query function';
    }
}
