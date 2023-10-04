import {
    blob,
    bool,
    Canister,
    float32,
    ic,
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
} from 'azle';

const Options = Variant({
    Small: Null,
    Medium: Null,
    Large: Null
});

const RawReply = Record({
    int: int,
    text: text,
    bool: bool,
    myBlob: blob,
    myVariant: Options
});

const Orbital = Record({
    layer: nat8,
    electrons: nat8
});

const Solid = Record({
    element: text
});

const Gas = Variant({
    Elemental: Null,
    Mixed: Null,
    Toxic: Null
});

const State = Variant({
    Gas: Gas,
    Liquid: Null,
    Solid: Solid
});

const Element = Record({
    id: text,
    orbitals: Vec(Orbital),
    state: State
});

export default Canister({
    // Updates
    manualUpdate: update(
        [text],
        Manual(text),
        (message) => {
            if (message === 'reject') {
                ic.reject(message);
                return;
            }

            ic.reply(message, text);
        },
        { manual: true }
    ),
    updateBlob: update(
        [],
        Manual(blob),
        () => {
            ic.reply(
                new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
                blob
            );
        },
        { manual: true }
    ),
    updateFloat32: update(
        [],
        Manual(float32),
        () => {
            ic.reply(1245.678, float32);
        },
        { manual: true }
    ),
    updateInt8: update(
        [],
        Manual(int8),
        () => {
            ic.reply(-100, int8);
        },
        { manual: true }
    ),
    updateNat: update(
        [],
        Manual(nat),
        () => {
            ic.reply(184467440737095516150n, nat);
        },
        { manual: true }
    ),
    updateNull: update(
        [],
        Manual(Null),
        () => {
            ic.reply(null, Null);
        },
        { manual: true }
    ),
    updateVoid: update(
        [],
        Manual(Void),
        () => {
            ic.reply(undefined, Void);
        },
        { manual: true }
    ),
    updateRecord: update(
        [],
        Manual(Element),
        () => {
            const element: typeof Element = {
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
            ic.reply(element, Element);
        },
        { manual: true }
    ),
    updateReserved: update(
        [],
        Manual(reserved),
        () => {
            ic.reply(undefined, reserved);
        },
        { manual: true }
    ),
    updateString: update(
        [],
        Manual(text),
        () => {
            ic.reply('hello', text);
        },
        { manual: true }
    ),
    updateVariant: update(
        [],
        Manual(Gas),
        () => {
            const gas = { Toxic: null };
            ic.reply(gas, Gas);
        },
        { manual: true }
    ),
    replyRaw: update(
        [],
        Manual(RawReply),
        () => {
            ic.replyRaw(
                ic.candidEncode(
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
                ic.reject(message);
                return;
            }

            ic.reply(message, text);
        },
        { manual: true }
    ),
    queryBlob: query(
        [],
        Manual(blob),
        () => {
            ic.reply(
                new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
                blob
            );
        },
        { manual: true }
    ),
    queryFloat32: query(
        [],
        Manual(float32),
        () => {
            ic.reply(1245.678, float32);
        },
        { manual: true }
    ),
    queryInt8: query(
        [],
        Manual(int8),
        () => {
            ic.reply(-100, int8);
        },
        { manual: true }
    ),
    queryNat: query(
        [],
        Manual(nat),
        () => {
            ic.reply(184_467_440_737_095_516_150n, nat);
        },
        { manual: true }
    ),
    queryNull: query(
        [],
        Manual(Null),
        () => {
            ic.reply(null, Null);
        },
        { manual: true }
    ),
    queryVoid: query(
        [],
        Manual(Void),
        () => {
            ic.reply(undefined, Void);
        },
        { manual: true }
    ),
    queryRecord: query(
        [],
        Manual(Element),
        () => {
            const element: typeof Element = {
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
            ic.reply(element, Element);
        },
        { manual: true }
    ),
    queryReserved: query(
        [],
        Manual(reserved),
        () => {
            ic.reply(undefined, reserved);
        },
        { manual: true }
    ),
    queryString: query(
        [],
        Manual(text),
        () => {
            ic.reply('hello', text);
        },
        { manual: true }
    ),
    queryVariant: query(
        [],
        Manual(Gas),
        () => {
            const gas = { Toxic: null };
            ic.reply(gas, Gas);
        },
        { manual: true }
    )
});
