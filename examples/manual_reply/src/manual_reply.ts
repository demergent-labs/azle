import {
    blob,
    float32,
    ic,
    int,
    int8,
    nat,
    nat8,
    QueryManual,
    reserved,
    UpdateManual,
    Variant
} from 'azle';

type Options = Variant<{
    Small: null;
    Medium: null;
    Large: null;
}>;

type RawReply = {
    int: int;
    text: string;
    bool: boolean;
    blob: blob;
    variant: Options;
};

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

// Updates

export function manual_update(message: string): UpdateManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

export function update_blob(): UpdateManual<blob> {
    ic.reply(new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]));
}

export function update_float32(): UpdateManual<float32> {
    ic.reply(1245.678);
}

// TODO: Inline Types not currently supported.
// See https://github.com/demergent-labs/azle/issues/474
// export function update_inline_type(): UpdateManual<{ prop: string }> {
//     ic.reply({ prop: 'prop' });
// }

export function update_int8(): UpdateManual<int8> {
    ic.reply(-100);
}

export function update_nat(): UpdateManual<nat> {
    ic.reply(184467440737095516150n);
}

export function update_null(): UpdateManual<null> {
    ic.reply(null);
}

export function update_record(): UpdateManual<Element> {
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

export function update_reserved(): UpdateManual<reserved> {
    ic.reply(undefined);
}

export function update_string(): UpdateManual<string> {
    ic.reply('hello');
}

export function update_variant(): UpdateManual<Gas> {
    const gas = { Toxic: null };
    ic.reply(gas);
}

// Queries

export function manual_query(message: string): QueryManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

export function query_blob(): QueryManual<blob> {
    ic.reply(new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]));
}

export function query_float32(): QueryManual<float32> {
    ic.reply(1245.678);
}

// TODO: Inline Types not currently supported.
// See https://github.com/demergent-labs/azle/issues/474
// export function query_inline_type(): QueryManual<{ prop: string }> {
//     ic.reply({ prop: 'prop' });
// }

export function query_int8(): QueryManual<int8> {
    ic.reply(-100);
}

export function query_nat(): QueryManual<nat> {
    ic.reply(184467440737095516150n);
}

export function query_null(): QueryManual<null> {
    ic.reply(null);
}

export function query_record(): QueryManual<Element> {
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

export function query_reserved(): QueryManual<reserved> {
    ic.reply(undefined);
}

export function query_string(): QueryManual<string> {
    ic.reply('hello');
}

export function query_variant(): QueryManual<Gas> {
    const gas = { Toxic: null };
    ic.reply(gas);
}

export function reply_raw(): UpdateManual<RawReply> {
    // const response = '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "Surprise!"; "variant" = variant {Medium} })';
    // const hex = execSync(`didc encode '${response}'`).toString().trim();
    // TODO expose candid encoding/decoding in azle.
    // See https://github.com/demergent-labs/azle/issues/400

    const candidEncodedArgumentsHexString =
        '4449444c036c05ef99c0027cddfae4880401aa88ee88047ead99e7e70471858189e70d026d7b6b019591f39a037f01002a0953757270726973652101047465787400';
    const candidEncodedArgumentsByteArray =
        candidEncodedArgumentsHexString
            .match(/.{1,2}/g)
            ?.map((byte) => parseInt(byte, 16)) ?? [];
    ic.reply_raw(new Uint8Array(candidEncodedArgumentsByteArray));
}
