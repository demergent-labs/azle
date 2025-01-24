import { candidEncode, IDL, reject, reply } from 'azle';
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

            reply({ data: message, idlType: text.getIdlType() });
        },
        { manual: true }
    ),
    updateBlob: update(
        [],
        Manual(blob),
        () => {
            reply({
                data: new Uint8Array([
                    83, 117, 114, 112, 114, 105, 115, 101, 33
                ]),
                idlType: blob.getIdlType()
            });
        },
        { manual: true }
    ),
    updateFloat32: update(
        [],
        Manual(float32),
        () => {
            reply({ data: 1245.678, idlType: float32.getIdlType() });
        },
        { manual: true }
    ),
    updateInt8: update(
        [],
        Manual(int8),
        () => {
            reply({ data: -100, idlType: int8.getIdlType() });
        },
        { manual: true }
    ),
    updateNat: update(
        [],
        Manual(nat),
        () => {
            reply({ data: 184467440737095516150n, idlType: nat.getIdlType() });
        },
        { manual: true }
    ),
    updateNull: update(
        [],
        Manual(Null),
        () => {
            reply({ data: null, idlType: Null.getIdlType() });
        },
        { manual: true }
    ),
    updateVoid: update(
        [],
        Manual(Void),
        () => {
            reply({ data: null, idlType: IDL.Null });
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
            reply({ data: element, idlType: Element.getIdlType([]) });
        },
        { manual: true }
    ),
    updateReserved: update(
        [],
        Manual(reserved),
        () => {
            reply({ data: undefined, idlType: reserved.getIdlType() });
        },
        { manual: true }
    ),
    updateString: update(
        [],
        Manual(text),
        () => {
            reply({ data: 'hello', idlType: text.getIdlType() });
        },
        { manual: true }
    ),
    updateVariant: update(
        [],
        Manual(Gas),
        () => {
            const gas = { Toxic: null };
            reply({ data: gas, idlType: Gas.getIdlType([]) });
        },
        { manual: true }
    ),
    replyRaw: update(
        [],
        Manual(RawReply),
        () => {
            reply({
                raw: candidEncode(
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
                reject(message);
                return;
            }

            reply({ data: message, idlType: text.getIdlType() });
        },
        { manual: true }
    ),
    queryBlob: query(
        [],
        Manual(blob),
        () => {
            reply({
                data: new Uint8Array([
                    83, 117, 114, 112, 114, 105, 115, 101, 33
                ]),
                idlType: blob.getIdlType()
            });
        },
        { manual: true }
    ),
    queryFloat32: query(
        [],
        Manual(float32),
        () => {
            reply({ data: 1245.678, idlType: float32.getIdlType() });
        },
        { manual: true }
    ),
    queryInt8: query(
        [],
        Manual(int8),
        () => {
            reply({ data: -100, idlType: int8.getIdlType() });
        },
        { manual: true }
    ),
    queryNat: query(
        [],
        Manual(nat),
        () => {
            reply({
                data: 184_467_440_737_095_516_150n,
                idlType: nat.getIdlType()
            });
        },
        { manual: true }
    ),
    queryNull: query(
        [],
        Manual(Null),
        () => {
            reply({ data: null, idlType: Null.getIdlType() });
        },
        { manual: true }
    ),
    queryVoid: query(
        [],
        Manual(Void),
        () => {
            reply({ data: undefined });
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
            reply({ data: element, idlType: Element.getIdlType([]) });
        },
        { manual: true }
    ),
    queryReserved: query(
        [],
        Manual(reserved),
        () => {
            reply({ data: undefined, idlType: reserved.getIdlType() });
        },
        { manual: true }
    ),
    queryString: query(
        [],
        Manual(text),
        () => {
            reply({ data: 'hello', idlType: text.getIdlType() });
        },
        { manual: true }
    ),
    queryVariant: query(
        [],
        Manual(Gas),
        () => {
            const gas = { Toxic: null };
            reply({ data: gas, idlType: Gas.getIdlType([]) });
        },
        { manual: true }
    )
});
