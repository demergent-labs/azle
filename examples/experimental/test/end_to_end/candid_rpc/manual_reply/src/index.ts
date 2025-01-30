import { candidEncode, IDL, msgReply, reject } from 'azle';
import {
    blob,
    bool,
    Canister,
    float32,
    int,
    int8,
    Manual,
    nat,
    nat8,
    Null,
    query,
    Record,
    reserved,
    text,
    update,
    Variant,
    Vec,
    Void
} from 'azle/experimental';

const Options = Variant({
    Small: Null,
    Medium: Null,
    Large: Null
});
type Options = typeof Options.tsType;

const RawReply = Record({
    int: int,
    text: text,
    bool: bool,
    myBlob: blob,
    myVariant: Options
});
type RawReply = typeof RawReply.tsType;

const Orbital = Record({
    layer: nat8,
    electrons: nat8
});
type Orbital = typeof Orbital.tsType;

const Solid = Record({
    element: text
});
type Solid = typeof Solid.tsType;

const Gas = Variant({
    Elemental: Null,
    Mixed: Null,
    Toxic: Null
});
type Gas = typeof Gas.tsType;

const State = Variant({
    Gas: Gas,
    Liquid: Null,
    Solid: Solid
});
type State = typeof State.tsType;

const Element = Record({
    id: text,
    orbitals: Vec(Orbital),
    state: State
});
type Element = typeof Element.tsType;

export default Canister({
    // Updates
    manualUpdate: update(
        [text],
        Manual(text),
        (message) => {
            if (message === 'reject') {
                reject(message);
                return;
            }

            const encoded = new Uint8Array(
                IDL.encode([text.getIdlType()], [message])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateBlob: update(
        [],
        Manual(blob),
        () => {
            const encoded = new Uint8Array(
                IDL.encode(
                    [blob.getIdlType()],
                    [
                        new Uint8Array([
                            83, 117, 114, 112, 114, 105, 115, 101, 33
                        ])
                    ]
                )
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateFloat32: update(
        [],
        Manual(float32),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([float32.getIdlType()], [1245.678])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateInt8: update(
        [],
        Manual(int8),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([int8.getIdlType()], [-100])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateNat: update(
        [],
        Manual(nat),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([nat.getIdlType()], [184467440737095516150n])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateNull: update(
        [],
        Manual(Null),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([Null.getIdlType()], [null])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateVoid: update(
        [],
        Manual(Void),
        () => {
            const encoded = new Uint8Array(IDL.encode([], []));

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateRecord: update(
        [],
        Manual(Element),
        () => {
            const element: Element = {
                id: 'b0283eb7-9c0e-41e5-8089-3345e6a8fa6a',
                orbitals: [
                    {
                        electrons: 2,
                        layer: 1
                    },
                    {
                        electrons: 8,
                        layer: 2
                    }
                ],
                state: {
                    Gas: { Elemental: null }
                }
            };
            const encoded = new Uint8Array(
                IDL.encode([Element.getIdlType([])], [element])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateReserved: update(
        [],
        Manual(reserved),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([reserved.getIdlType()], [undefined])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateString: update(
        [],
        Manual(text),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([text.getIdlType()], ['hello'])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    updateVariant: update(
        [],
        Manual(Gas),
        () => {
            const gas = { Toxic: null };
            const encoded = new Uint8Array(
                IDL.encode([Gas.getIdlType([])], [gas])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    replyRaw: update(
        [],
        Manual(RawReply),
        () => {
            msgReply(
                candidEncode(
                    '(record { "int" = 42; "text" = "text"; "bool" = true; "myBlob" = blob "Surprise!"; "myVariant" = variant { Medium } })'
                )
            );
        },
        { manual: true }
    ),
    // Queries
    manualQuery: query(
        [text],
        Manual(text),
        (message) => {
            if (message === 'reject') {
                reject(message);
                return;
            }

            const encoded = new Uint8Array(
                IDL.encode([text.getIdlType()], [message])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryBlob: query(
        [],
        Manual(blob),
        () => {
            const encoded = new Uint8Array(
                IDL.encode(
                    [blob.getIdlType()],
                    [
                        new Uint8Array([
                            83, 117, 114, 112, 114, 105, 115, 101, 33
                        ])
                    ]
                )
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryFloat32: query(
        [],
        Manual(float32),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([float32.getIdlType()], [1245.678])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryInt8: query(
        [],
        Manual(int8),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([int8.getIdlType()], [-100])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryNat: query(
        [],
        Manual(nat),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([nat.getIdlType()], [184467440737095516150n])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryNull: query(
        [],
        Manual(Null),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([Null.getIdlType()], [null])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryVoid: query(
        [],
        Manual(Void),
        () => {
            const encoded = new Uint8Array(IDL.encode([], []));

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryRecord: query(
        [],
        Manual(Element),
        () => {
            const element: Element = {
                id: 'b0283eb7-9c0e-41e5-8089-3345e6a8fa6a',
                orbitals: [
                    {
                        electrons: 2,
                        layer: 1
                    },
                    {
                        electrons: 8,
                        layer: 2
                    }
                ],
                state: {
                    Gas: { Elemental: null }
                }
            };

            const encoded = new Uint8Array(
                IDL.encode([Element.getIdlType([])], [element])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryReserved: query(
        [],
        Manual(reserved),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([reserved.getIdlType()], [undefined])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryString: query(
        [],
        Manual(text),
        () => {
            const encoded = new Uint8Array(
                IDL.encode([text.getIdlType()], ['hello'])
            );

            msgReply(encoded);
        },
        { manual: true }
    ),
    queryVariant: query(
        [],
        Manual(Gas),
        () => {
            const gas = { Toxic: null };

            const encoded = new Uint8Array(
                IDL.encode([Gas.getIdlType([])], [gas])
            );

            msgReply(encoded);
        },
        { manual: true }
    )
});
