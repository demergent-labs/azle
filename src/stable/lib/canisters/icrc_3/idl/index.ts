import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface DataCertificate {
    certificate: Uint8Array | number[];
    hash_tree: Uint8Array | number[];
}
export interface GetArchivesArgs {
    from: [] | [Principal];
}
export type GetArchivesResult = Array<{
    end: bigint;
    canister_id: Principal;
    start: bigint;
}>;
export type GetBlocksArgs = Array<{ start: bigint; length: bigint }>;
export interface GetBlocksResult {
    log_length: bigint;
    blocks: Array<{ id: bigint; block: Value }>;
    archived_blocks: Array<{
        args: GetBlocksArgs;
        callback: [Principal, string];
    }>;
}
export type Value =
    | { Int: bigint }
    | { Map: Array<[string, Value]> }
    | { Nat: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string }
    | { Array: Array<Value> };
export interface _SERVICE {
    icrc3_get_archives: ActorMethod<[GetArchivesArgs], GetArchivesResult>;
    icrc3_get_blocks: ActorMethod<[GetBlocksArgs], GetBlocksResult>;
    icrc3_get_tip_certificate: ActorMethod<[], [] | [DataCertificate]>;
    icrc3_supported_block_types: ActorMethod<
        [],
        Array<{ url: string; block_type: string }>
    >;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const GetBlocksResult = IDL.Rec();
export const Value = IDL.Rec();
export const GetArchivesArgs = IDL.Record({ from: IDL.Opt(IDL.Principal) });
export const GetArchivesResult = IDL.Vec(
    IDL.Record({
        end: IDL.Nat,
        canister_id: IDL.Principal,
        start: IDL.Nat
    })
);
export const GetBlocksArgs = IDL.Vec(
    IDL.Record({ start: IDL.Nat, length: IDL.Nat })
);
Value.fill(
    IDL.Variant({
        Int: IDL.Int,
        Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text,
        Array: IDL.Vec(Value)
    })
);
GetBlocksResult.fill(
    IDL.Record({
        log_length: IDL.Nat,
        blocks: IDL.Vec(IDL.Record({ id: IDL.Nat, block: Value })),
        archived_blocks: IDL.Vec(
            IDL.Record({
                args: GetBlocksArgs,
                callback: IDL.Func(
                    [GetBlocksArgs],
                    [GetBlocksResult],
                    ['query']
                )
            })
        )
    })
);
export const DataCertificate = IDL.Record({
    certificate: IDL.Vec(IDL.Nat8),
    hash_tree: IDL.Vec(IDL.Nat8)
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const GetBlocksResult = IDL.Rec();
    const Value = IDL.Rec();
    const GetArchivesArgs = IDL.Record({ from: IDL.Opt(IDL.Principal) });
    const GetArchivesResult = IDL.Vec(
        IDL.Record({
            end: IDL.Nat,
            canister_id: IDL.Principal,
            start: IDL.Nat
        })
    );
    const GetBlocksArgs = IDL.Vec(
        IDL.Record({ start: IDL.Nat, length: IDL.Nat })
    );
    Value.fill(
        IDL.Variant({
            Int: IDL.Int,
            Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
            Nat: IDL.Nat,
            Blob: IDL.Vec(IDL.Nat8),
            Text: IDL.Text,
            Array: IDL.Vec(Value)
        })
    );
    GetBlocksResult.fill(
        IDL.Record({
            log_length: IDL.Nat,
            blocks: IDL.Vec(IDL.Record({ id: IDL.Nat, block: Value })),
            archived_blocks: IDL.Vec(
                IDL.Record({
                    args: GetBlocksArgs,
                    callback: IDL.Func(
                        [GetBlocksArgs],
                        [GetBlocksResult],
                        ['query']
                    )
                })
            )
        })
    );
    const DataCertificate = IDL.Record({
        certificate: IDL.Vec(IDL.Nat8),
        hash_tree: IDL.Vec(IDL.Nat8)
    });
    return IDL.Service({
        icrc3_get_archives: IDL.Func(
            [GetArchivesArgs],
            [GetArchivesResult],
            ['query']
        ),
        icrc3_get_blocks: IDL.Func(
            [GetBlocksArgs],
            [GetBlocksResult],
            ['query']
        ),
        icrc3_get_tip_certificate: IDL.Func(
            [],
            [IDL.Opt(DataCertificate)],
            ['query']
        ),
        icrc3_supported_block_types: IDL.Func(
            [],
            [IDL.Vec(IDL.Record({ url: IDL.Text, block_type: IDL.Text }))],
            ['query']
        )
    });
};
export const init: init = () => {
    return [];
};
