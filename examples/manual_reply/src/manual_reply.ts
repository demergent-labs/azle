import {
    blob,
    float32,
    ic,
    int,
    int8,
    Manual,
    nat,
    nat8,
    $query,
    Record,
    reserved,
    $update,
    Variant
} from 'azle';

type Options = Variant<{
    Small: null;
    Medium: null;
    Large: null;
}>;

type RawReply = Record<{
    int: int;
    text: string;
    bool: boolean;
    blob: blob;
    variant: Options;
}>;

type Element = Record<{
    id: string;
    orbitals: Orbital[];
    state: State;
}>;

type Orbital = Record<{
    layer: nat8;
    electrons: nat8;
}>;

type State = Variant<{
    Gas: Gas;
    Liquid: null;
    Solid: Solid;
}>;

type Solid = Record<{
    element: string;
}>;

type Gas = Variant<{
    Elemental: null;
    Mixed: null;
    Toxic: null;
}>;

// Updates

$update;
export function manual_update(message: string): Manual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

$update;
export function update_blob(): Manual<blob> {
    ic.reply(new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]));
}

$update;
export function update_float32(): Manual<float32> {
    ic.reply(1245.678);
}

// TODO: Inline Types not currently supported.
// See https://github.com/demergent-labs/azle/issues/474
// export function update_inline_type(): Manual<{ prop: string }> {
//     ic.reply({ prop: 'prop' });
// }

$update;
export function update_int8(): Manual<int8> {
    ic.reply(-100);
}

$update;
export function update_nat(): Manual<nat> {
    ic.reply(184467440737095516150n);
}

$update;
export function update_null(): Manual<null> {
    ic.reply(null);
}

$update;
export function update_record(): Manual<Element> {
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

$update;
export function update_reserved(): Manual<reserved> {
    ic.reply(undefined);
}

$update;
export function update_string(): Manual<string> {
    ic.reply('hello');
}

$update;
export function update_variant(): Manual<Gas> {
    const gas = { Toxic: null };
    ic.reply(gas);
}

$update;
export function reply_raw(): Manual<RawReply> {
    ic.replyRaw(
        ic.candidEncode(
            '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "Surprise!"; "variant" = variant { Medium } })'
        )
    );
}

// Queries

$query;
export function manual_query(message: string): Manual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

$query;
export function query_blob(): Manual<blob> {
    ic.reply(new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]));
}

$query;
export function query_float32(): Manual<float32> {
    ic.reply(1245.678);
}

// TODO: Inline Types not currently supported.
// See https://github.com/demergent-labs/azle/issues/474
// export function query_inline_type(): Manual<{> prop: string } {
//     ic.reply({ prop: 'prop' });
// }

$query;
export function query_int8(): Manual<int8> {
    ic.reply(-100);
}

$query;
export function query_nat(): Manual<nat> {
    ic.reply(184_467_440_737_095_516_150n);
}

$query;
export function query_null(): Manual<null> {
    ic.reply(null);
}

$query;
export function query_record(): Manual<Element> {
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

$query;
export function query_reserved(): Manual<reserved> {
    ic.reply(undefined);
}

$query;
export function query_string(): Manual<string> {
    ic.reply('hello');
}

$query;
export function query_variant(): Manual<Gas> {
    const gas = { Toxic: null };
    ic.reply(gas);
}
