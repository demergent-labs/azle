import {
    blob,
    empty,
    float32,
    ic,
    int8,
    nat,
    nat8,
    QueryManual,
    reserved,
    UpdateManual,
    Variant
} from 'azle';

type Element = {
    id: string;
    orbitals: Orbital[];
    state: State;
};

type Orbital = {
    layer: nat8;
    electrons: nat8;
};

type State = Variant<{
    Gas: Gas;
    Liquid: null;
    Solid: Solid;
}>;

type Solid = {
    element: string;
};

type Gas = Variant<{
    Elemental: null;
    Mixed: null;
    Toxic: null;
}>;

export function manual_query(message: string): QueryManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

export function manual_update(message: string): UpdateManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

export function reply_blob(): UpdateManual<blob> {
    ic.reply(new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]));
}

export function reply_float32(): UpdateManual<float32> {
    ic.reply(1245.678);
}

export function reply_int8(): UpdateManual<int8> {
    ic.reply(-100);
}

export function reply_nat(): UpdateManual<nat> {
    ic.reply(184467440737095516150n);
}

export function reply_string(): UpdateManual<string> {
    ic.reply('hello');
}

export function reply_reserved(): UpdateManual<reserved> {
    ic.reply(undefined);
}

export function reply_record(): UpdateManual<Element> {
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
    ic.reply(element);
}

export function reply_variant(): UpdateManual<Gas> {
    const gas = { Toxic: null };
    ic.reply(gas);
}
