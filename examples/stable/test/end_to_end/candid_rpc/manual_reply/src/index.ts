import {
    candidEncode,
    IDL,
    msgArgData,
    msgReject,
    msgReply,
    query,
    update
} from 'azle';

const Options = IDL.Variant({
    Small: IDL.Null,
    Medium: IDL.Null,
    Large: IDL.Null
});
type Options =
    | {
          Small: null;
      }
    | {
          Medium: null;
      }
    | {
          Large: null;
      };

const RawReply = IDL.Record({
    int: IDL.Int,
    text: IDL.Text,
    bool: IDL.Bool,
    myBlob: IDL.Vec(IDL.Nat8),
    myVariant: Options
});
type RawReply = {
    int: string;
    text: string;
    bool: boolean;
    myBlob: Uint8Array;
    myVariant: Options;
};

const Orbital = IDL.Record({
    layer: IDL.Nat8,
    electrons: IDL.Nat8
});
type Orbital = {
    layer: number;
    electrons: number;
};

const Solid = IDL.Record({
    element: IDL.Text
});
type Solid = {
    element: string;
};

const Gas = IDL.Variant({
    Elemental: IDL.Null,
    Mixed: IDL.Null,
    Toxic: IDL.Null
});
type Gas =
    | {
          Elemental: null;
      }
    | { Mixed: null }
    | {
          Toxic: null;
      };

const State = IDL.Variant({
    Gas: Gas,
    Liquid: IDL.Null,
    Solid: Solid
});
type State =
    | {
          Gas: Gas;
      }
    | { Liquid: null }
    | {
          Solid: Solid;
      };

const Element = IDL.Record({
    id: IDL.Text,
    orbitals: IDL.Vec(Orbital),
    state: State
});
type Element = {
    id: string;
    orbitals: Orbital[];
    state: State;
};

export default class {
    // Updates
    @update([IDL.Text], IDL.Text, { manual: true })
    manualUpdate(): void {
        const argData = msgArgData();

        const message = IDL.decode([IDL.Text], argData)[0] as string;

        if (message === 'reject on purpose') {
            msgReject(message);
            return;
        }

        msgReply(new Uint8Array(IDL.encode([IDL.Text], [message])));
    }

    @update([], IDL.Vec(IDL.Nat8), { manual: true })
    updateBlob(): void {
        msgReply(
            new Uint8Array(
                IDL.encode(
                    [IDL.Vec(IDL.Nat8)],
                    [
                        new Uint8Array([
                            83, 117, 114, 112, 114, 105, 115, 101, 33
                        ])
                    ]
                )
            )
        );
    }

    @update([], IDL.Float32, { manual: true })
    updateFloat32(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Float32], [1245.678])));
    }

    @update([], IDL.Int8, { manual: true })
    updateInt8(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Int8], [-100])));
    }

    @update([], IDL.Nat, { manual: true })
    updateNat(): void {
        msgReply(
            new Uint8Array(IDL.encode([IDL.Nat], [184467440737095516150n]))
        );
    }

    @update([], IDL.Null, { manual: true })
    updateNull(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Null], [null])));
    }

    @update([], undefined, { manual: true })
    updateVoid(): void {
        msgReply(new Uint8Array(IDL.encode([], [])));
    }

    @update([], Element, { manual: true })
    updateRecord(): void {
        const element: Element = {
            id: 'b0283eb7-9c0e-41e5-8089-3345e6a8fa6a',
            orbitals: [
                { electrons: 2, layer: 1 },
                { electrons: 8, layer: 2 }
            ],
            state: { Gas: { Elemental: null } }
        };

        msgReply(new Uint8Array(IDL.encode([Element], [element])));
    }

    @update([], IDL.Reserved, { manual: true })
    updateReserved(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Reserved], [undefined])));
    }

    @update([], IDL.Text, { manual: true })
    updateString(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Text], ['hello'])));
    }

    @update([], Gas, { manual: true })
    updateVariant(): void {
        const gas: Gas = { Toxic: null };
        msgReply(new Uint8Array(IDL.encode([Gas], [gas])));
    }

    @update([], RawReply, { manual: true })
    replyRaw(): void {
        msgReply(
            candidEncode(
                '(record { "int" = 42; "text" = "text"; "bool" = true; "myBlob" = blob "Surprise!"; "myVariant" = variant { Medium } })'
            )
        );
    }

    // Queries
    @query([IDL.Text], IDL.Text, { manual: true })
    manualQuery(): void {
        const argData = msgArgData();

        const message = IDL.decode([IDL.Text], argData)[0] as string;

        if (message === 'reject on purpose') {
            msgReject(message);
            return;
        }

        msgReply(new Uint8Array(IDL.encode([IDL.Text], [message])));
    }

    @query([], IDL.Vec(IDL.Nat8), { manual: true })
    queryBlob(): void {
        msgReply(
            new Uint8Array(
                IDL.encode(
                    [IDL.Vec(IDL.Nat8)],
                    [
                        new Uint8Array([
                            83, 117, 114, 112, 114, 105, 115, 101, 33
                        ])
                    ]
                )
            )
        );
    }

    @query([], IDL.Float32, { manual: true })
    queryFloat32(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Float32], [1245.678])));
    }

    @query([], IDL.Int8, { manual: true })
    queryInt8(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Int8], [-100])));
    }

    @query([], IDL.Nat, { manual: true })
    queryNat(): void {
        msgReply(
            new Uint8Array(IDL.encode([IDL.Nat], [184467440737095516150n]))
        );
    }

    @query([], IDL.Null, { manual: true })
    queryNull(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Null], [null])));
    }

    @query([], undefined, { manual: true })
    queryVoid(): void {
        msgReply(new Uint8Array(IDL.encode([], [])));
    }

    @query([], Element, { manual: true })
    queryRecord(): void {
        const element: Element = {
            id: 'b0283eb7-9c0e-41e5-8089-3345e6a8fa6a',
            orbitals: [
                { electrons: 2, layer: 1 },
                { electrons: 8, layer: 2 }
            ],
            state: { Gas: { Elemental: null } }
        };

        msgReply(new Uint8Array(IDL.encode([Element], [element])));
    }

    @query([], IDL.Reserved, { manual: true })
    queryReserved(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Reserved], [undefined])));
    }

    @query([], IDL.Text, { manual: true })
    queryString(): void {
        msgReply(new Uint8Array(IDL.encode([IDL.Text], ['hello'])));
    }

    @query([], Gas, { manual: true })
    queryVariant(): void {
        const gas: Gas = { Toxic: null };
        msgReply(new Uint8Array(IDL.encode([Gas], [gas])));
    }
}
