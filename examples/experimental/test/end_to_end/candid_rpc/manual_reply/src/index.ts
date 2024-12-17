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
                ic.reject(message);
                return;
            }

            ic.reply({ data: message, candidType: text });
        },
        { manual: true }
    ),
    updateBlob: update(
        [],
        Manual(blob),
        () => {
            ic.reply({
                data: new Uint8Array([
                    83, 117, 114, 112, 114, 105, 115, 101, 33
                ]),
                candidType: blob
            });
        },
        { manual: true }
    ),
    updateFloat32: update(
        [],
        Manual(float32),
        () => {
            ic.reply({ data: 1245.678, candidType: float32 });
        },
        { manual: true }
    ),
    updateInt8: update(
        [],
        Manual(int8),
        () => {
            ic.reply({ data: -100, candidType: int8 });
        },
        { manual: true }
    ),
    updateNat: update(
        [],
        Manual(nat),
        () => {
            ic.reply({ data: 184467440737095516150n, candidType: nat });
        },
        { manual: true }
    ),
    updateNull: update(
        [],
        Manual(Null),
        () => {
            ic.reply({ data: null, candidType: Null });
        },
        { manual: true }
    ),
    updateVoid: update(
        [],
        Manual(Void),
        () => {
            ic.reply({ data: undefined, candidType: Void });
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
            ic.reply({ data: element, candidType: Element });
        },
        { manual: true }
    ),
    updateReserved: update(
        [],
        Manual(reserved),
        () => {
            ic.reply({ data: undefined, candidType: reserved });
        },
        { manual: true }
    ),
    updateString: update(
        [],
        Manual(text),
        () => {
            ic.reply({ data: 'hello', candidType: text });
        },
        { manual: true }
    ),
    updateVariant: update(
        [],
        Manual(Gas),
        () => {
            const gas = { Toxic: null };
            ic.reply({ data: gas, candidType: Gas });
        },
        { manual: true }
    ),
    replyRaw: update(
        [],
        Manual(RawReply),
        () => {
            ic.reply({
                raw: ic.candidEncode(
                    '(record { "int" = 42; "text" = "text"; "bool" = true; "myBlob" = blob "Surprise!"; "myVariant" = variant { Medium } })'
                )
            });
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

            ic.reply({ data: message, candidType: text });
        },
        { manual: true }
    ),
    queryBlob: query(
        [],
        Manual(blob),
        () => {
            ic.reply({
                data: new Uint8Array([
                    83, 117, 114, 112, 114, 105, 115, 101, 33
                ]),
                candidType: blob
            });
        },
        { manual: true }
    ),
    queryFloat32: query(
        [],
        Manual(float32),
        () => {
            ic.reply({ data: 1245.678, candidType: float32 });
        },
        { manual: true }
    ),
    queryInt8: query(
        [],
        Manual(int8),
        () => {
            ic.reply({ data: -100, candidType: int8 });
        },
        { manual: true }
    ),
    queryNat: query(
        [],
        Manual(nat),
        () => {
            ic.reply({ data: 184_467_440_737_095_516_150n, candidType: nat });
        },
        { manual: true }
    ),
    queryNull: query(
        [],
        Manual(Null),
        () => {
            ic.reply({ data: null, candidType: Null });
        },
        { manual: true }
    ),
    queryVoid: query(
        [],
        Manual(Void),
        () => {
            ic.reply({ data: undefined, candidType: Void });
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
            ic.reply({ data: element, candidType: Element });
        },
        { manual: true }
    ),
    queryReserved: query(
        [],
        Manual(reserved),
        () => {
            ic.reply({ data: undefined, candidType: reserved });
        },
        { manual: true }
    ),
    queryString: query(
        [],
        Manual(text),
        () => {
            ic.reply({ data: 'hello', candidType: text });
        },
        { manual: true }
    ),
    queryVariant: query(
        [],
        Manual(Gas),
        () => {
            const gas = { Toxic: null };
            ic.reply({ data: gas, candidType: Gas });
        },
        { manual: true }
    )
});
