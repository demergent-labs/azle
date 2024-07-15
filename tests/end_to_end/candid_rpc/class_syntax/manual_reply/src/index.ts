import { candidEncode, IDL, query, reject, reply, update } from 'azle';

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
    manualUpdate(message: string): void {
        if (message === 'reject') {
            reject(message);
            return;
        }

        reply({ data: message, idlType: IDL.Text });
    }

    @update([], IDL.Vec(IDL.Nat8), { manual: true })
    updateBlob(): void {
        reply({
            data: new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
            idlType: IDL.Vec(IDL.Nat8)
        });
    }

    @update([], IDL.Float32, { manual: true })
    updateFloat32(): void {
        reply({ data: 1245.678, idlType: IDL.Float32 });
    }

    @update([], IDL.Int8, { manual: true })
    updateInt8(): void {
        reply({ data: -100, idlType: IDL.Int8 });
    }

    @update([], IDL.Nat, { manual: true })
    updateNat(): void {
        reply({ data: 184467440737095516150n, idlType: IDL.Nat });
    }

    @update([], IDL.Null, { manual: true })
    updateNull(): void {
        reply({ data: null, idlType: IDL.Null });
    }

    @update([], undefined, { manual: true })
    updateVoid(): void {
        reply({ data: undefined });
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
        reply({ data: element, idlType: Element });
    }

    @update([], IDL.Reserved, { manual: true })
    updateReserved(): void {
        reply({ data: undefined, idlType: IDL.Reserved });
    }

    @update([], IDL.Text, { manual: true })
    updateString(): void {
        reply({ data: 'hello', idlType: IDL.Text });
    }

    @update([], Gas, { manual: true })
    updateVariant(): void {
        const gas: Gas = { Toxic: null };
        reply({ data: gas, idlType: Gas });
    }

    @update([], RawReply, { manual: true })
    replyRaw(): void {
        reply({
            raw: candidEncode(
                '(record { "int" = 42; "text" = "text"; "bool" = true; "myBlob" = blob "Surprise!"; "myVariant" = variant { Medium } })'
            )
        });
    }

    // Queries
    @query([IDL.Text], IDL.Text, { manual: true })
    manualQuery(message: string): void {
        if (message === 'reject') {
            reject(message);
            return;
        }

        reply({ data: message, idlType: IDL.Text });
    }

    @query([], IDL.Vec(IDL.Nat8), { manual: true })
    queryBlob(): void {
        reply({
            data: new Uint8Array([83, 117, 114, 112, 114, 105, 115, 101, 33]),
            idlType: IDL.Vec(IDL.Nat8)
        });
    }

    @query([], IDL.Float32, { manual: true })
    queryFloat32(): void {
        reply({ data: 1245.678, idlType: IDL.Float32 });
    }

    @query([], IDL.Int8, { manual: true })
    queryInt8(): void {
        reply({ data: -100, idlType: IDL.Int8 });
    }

    @query([], IDL.Nat, { manual: true })
    queryNat(): void {
        reply({ data: 184467440737095516150n, idlType: IDL.Nat });
    }

    @query([], IDL.Null, { manual: true })
    queryNull(): void {
        reply({ data: null, idlType: IDL.Null });
    }

    @query([], undefined, { manual: true })
    queryVoid(): void {
        reply({ data: undefined });
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

        reply({ data: element, idlType: Element });
    }

    @query([], IDL.Reserved, { manual: true })
    queryReserved(): void {
        reply({ data: undefined, idlType: IDL.Reserved });
    }

    @query([], IDL.Text, { manual: true })
    queryString(): void {
        reply({ data: 'hello', idlType: IDL.Text });
    }

    @query([], Gas, { manual: true })
    queryVariant(): void {
        const gas: Gas = { Toxic: null };

        reply({ data: gas, idlType: Gas });
    }
}
