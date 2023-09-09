import {
    blob,
    bool,
    candid,
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
    Service,
    text,
    Tuple,
    update,
    Variant,
    Vec,
    Void
} from 'azle';

class Options extends Variant {
    @candid(Null)
    Small?: Null;

    @candid(Null)
    Medium?: Null;

    @candid(Null)
    Large?: Null;
}

class RawReply extends Record {
    @candid(int)
    int: int;

    @candid(text)
    text: text;

    @candid(bool)
    bool: bool;

    @candid(blob)
    myBlob: blob;

    @candid(Options)
    myVariant: Options;
}

class Orbital extends Record {
    @candid(nat8)
    layer: nat8;

    @candid(nat8)
    electrons: nat8;
}

class Solid extends Record {
    @candid(text)
    element: text;
}

class Gas extends Variant {
    @candid(Null)
    Elemental?: Null;

    @candid(Null)
    Mixed?: Null;

    @candid(Null)
    Toxic?: Null;
}

class State extends Variant {
    @candid(Gas)
    Gas?: Gas;

    @candid(Null)
    Liquid?: Null;

    @candid(Solid)
    Solid?: Solid;
}

class Element extends Record {
    @candid(text)
    id: text;

    @candid(Vec(Orbital))
    orbitals: Vec<Orbital>;

    @candid(State)
    state: State;
}

export default class extends Service {
    // Updates
    @update([text], text, { manual: true })
    manualUpdate(message: text): Manual<text> {
        if (message === 'reject') {
            ic.reject(message);
            return;
        }

        ic.reply(message, text);
    }

    @update([], blob, { manual: true })
    updateBlob(): Manual<blob> {
        ic.reply(
            new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
            blob
        );
    }

    @update([], float32, { manual: true })
    updateFloat32(): Manual<float32> {
        ic.reply(1245.678, float32);
    }

    @update([], Tuple(text, text), { manual: true })
    updateInlineType(): Manual<[text, text]> {
        ic.reply(['Hello', 'World'], Tuple(text, text));
    }

    @update([], int8, { manual: true })
    updateInt8(): Manual<int8> {
        ic.reply(-100, int8);
    }

    @update([], nat, { manual: true })
    updateNat(): Manual<nat> {
        ic.reply(184467440737095516150n, nat);
    }

    @update([], Null, { manual: true })
    updateNull(): Manual<Null> {
        ic.reply(null, Null);
    }

    @update([], Void, { manual: true })
    updateVoid(): Manual<Void> {
        ic.reply(undefined, Void);
    }

    @update([], Element, { manual: true })
    updateRecord(): Manual<Element> {
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
    updateReserved(): Manual<reserved> {
        ic.reply(undefined, reserved);
    }

    @update([], text, { manual: true })
    updateString(): Manual<text> {
        ic.reply('hello', text);
    }

    @update([], Gas, { manual: true })
    updateVariant(): Manual<Gas> {
        const gas = { Toxic: null };
        ic.reply(gas, Gas);
    }

    @update([], RawReply, { manual: true })
    replyRaw(): Manual<RawReply> {
        ic.replyRaw(
            ic.candidEncode(
                '(record { "int" = 42; "text" = "text"; "bool" = true; "myBlob" = blob "Surprise!"; "myVariant" = variant { Medium } })'
            )
        );
    }

    // Queries

    @query([text], text, { manual: true })
    manualQuery(message: text): Manual<text> {
        if (message === 'reject') {
            ic.reject(message);
            return;
        }

        ic.reply(message, text);
    }

    @query([], blob, { manual: true })
    queryBlob(): Manual<blob> {
        ic.reply(
            new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
            blob
        );
    }

    @query([], float32, { manual: true })
    queryFloat32(): Manual<float32> {
        ic.reply(1245.678, float32);
    }

    // TODO: Inline Types not currently supported.
    // See https://github.com/demergent-labs/azle/issues/474
    // queryInlineType(): Manual<{> prop: string } {
    //     ic.reply({ prop: 'prop' });
    // }

    @query([], int8, { manual: true })
    queryInt8(): Manual<int8> {
        ic.reply(-100, int8);
    }

    @query([], nat, { manual: true })
    queryNat(): Manual<nat> {
        ic.reply(184_467_440_737_095_516_150n, nat);
    }

    @query([], Null, { manual: true })
    queryNull(): Manual<Null> {
        ic.reply(null, Null);
    }

    @query([], Void, { manual: true })
    queryVoid(): Manual<Void> {
        ic.reply(undefined, Void);
    }

    @query([], Element, { manual: true })
    queryRecord(): Manual<Element> {
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
    queryReserved(): Manual<reserved> {
        ic.reply(undefined, reserved);
    }

    @query([], text, { manual: true })
    queryString(): Manual<text> {
        ic.reply('hello', text);
    }

    @query([], Gas, { manual: true })
    queryVariant(): Manual<Gas> {
        const gas = { Toxic: null };
        ic.reply(gas, Gas);
    }
}
