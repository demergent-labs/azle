import {
    blob,
    bool,
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

export default class {
    // Updates
    @update([text], text, { manual: true })
    manualUpdate(message) {
        if (message === 'reject') {
            ic.reject(message);
            return;
        }

        ic.reply(message, text);
    }
    @update([], blob, { manual: true })
    updateBlob() {
        ic.reply(
            new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
            blob
        );
    }
    @update([], float32, { manual: true })
    updateFloat32() {
        ic.reply(1245.678, float32);
    }
    @update([], int8, { manual: true })
    updateInt8() {
        ic.reply(-100, int8);
    }
    @update([], nat, { manual: true })
    updateNat() {
        ic.reply(184467440737095516150n, nat);
    }
    @update([], Null, { manual: true })
    updateNull() {
        ic.reply(null, Null);
    }
    @update([], Void, { manual: true })
    updateVoid() {
        ic.reply(undefined, Void);
    }
    @update([], Element, { manual: true })
    updateRecord() {
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
        ic.reply(element, Element);
    }
    @update([], reserved, { manual: true })
    updateReserved() {
        ic.reply(undefined, reserved);
    }
    @update([], text, { manual: true })
    updateString() {
        ic.reply('hello', text);
    }
    @update([], Gas, { manual: true })
    updateVariant() {
        const gas = { Toxic: null };
        ic.reply(gas, Gas);
    }
    @update([], RawReply, { manual: true })
    replyRaw() {
        ic.replyRaw(
            ic.candidEncode(
                '(record { "int" = 42; "text" = "text"; "bool" = true; "myBlob" = blob "Surprise!"; "myVariant" = variant { Medium } })'
            )
        );
    }
    // Queries
    @query([text], text, { manual: true })
    manualQuery(message) {
        if (message === 'reject') {
            ic.reject(message);
            return;
        }

        ic.reply(message, text);
    }
    @query([], blob, { manual: true })
    queryBlob() {
        ic.reply(
            new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
            blob
        );
    }
    @query([], float32, { manual: true })
    queryFloat32() {
        ic.reply(1245.678, float32);
    }
    @query([], int8, { manual: true })
    queryInt8() {
        ic.reply(-100, int8);
    }
    @query([], nat, { manual: true })
    queryNat() {
        ic.reply(184_467_440_737_095_516_150n, nat);
    }
    @query([], Null, { manual: true })
    queryNull() {
        ic.reply(null, Null);
    }
    @query([], Void, { manual: true })
    queryVoid() {
        ic.reply(undefined, Void);
    }
    @query([], Element, { manual: true })
    queryRecord() {
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
        ic.reply(element, Element);
    }
    @query([], reserved, { manual: true })
    queryReserved() {
        ic.reply(undefined, reserved);
    }
    @query([], text, { manual: true })
    queryString() {
        ic.reply('hello', text);
    }
    @query([], Gas, { manual: true })
    queryVariant() {
        const gas = { Toxic: null };
        ic.reply(gas, Gas);
    }
}
