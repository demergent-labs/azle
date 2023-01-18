import {
    blob,
    float32,
    ic,
    int,
    int8,
    Manual,
    nat,
    nat8,
    Query,
    reserved,
    Update,
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

export function manual_update(message: string): Update<Manual<string>> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

export function update_blob(): Update<Manual<blob>> {
    ic.reply(new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]));
}

export function update_float32(): Update<Manual<float32>> {
    ic.reply(1245.678);
}

// TODO: Inline Types not currently supported.
// See https://github.com/demergent-labs/azle/issues/474
// export function update_inline_type(): Update<Manual<{ prop: string }>> {
//     ic.reply({ prop: 'prop' });
// }

export function update_int8(): Update<Manual<int8>> {
    ic.reply(-100);
}

export function update_nat(): Update<Manual<nat>> {
    ic.reply(184467440737095516150n);
}

export function update_null(): Update<Manual<null>> {
    ic.reply(null);
}

export function update_record(): Update<Manual<Element>> {
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

export function update_reserved(): Update<Manual<reserved>> {
    ic.reply(undefined);
}

export function update_string(): Update<Manual<string>> {
    ic.reply('hello');
}

export function update_variant(): Update<Manual<Gas>> {
    const gas = { Toxic: null };
    ic.reply(gas);
}

// Queries

export function manual_query(message: string): Query<Manual<string>> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

export function query_blob(): Query<Manual<blob>> {
    ic.reply(new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]));
}

export function query_float32(): Query<Manual<float32>> {
    ic.reply(1245.678);
}

// TODO: Inline Types not currently supported.
// See https://github.com/demergent-labs/azle/issues/474
// export function query_inline_type(): Query<Manual<{> prop: string }> {
//     ic.reply({ prop: 'prop' });
// }

export function query_int8(): Query<Manual<int8>> {
    ic.reply(-100);
}

export function query_nat(): Query<Manual<nat>> {
    ic.reply(184_467_440_737_095_516_150n);
}

export function query_null(): Query<Manual<null>> {
    ic.reply(null);
}

export function query_record(): Query<Manual<Element>> {
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

export function query_reserved(): Query<Manual<reserved>> {
    ic.reply(undefined);
}

export function query_string(): Query<Manual<string>> {
    ic.reply('hello');
}

export function query_variant(): Query<Manual<Gas>> {
    const gas = { Toxic: null };
    ic.reply(gas);
}

export function reply_raw(): Update<Manual<RawReply>> {
    ic.reply_raw(
        ic.candid_encode(
            '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "Surprise!"; "variant" = variant { Medium } })'
        )
    );
}
