import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    getBalance: ActorMethod<[], bigint>;
    getDepositAddress: ActorMethod<[], string>;
    transfer: ActorMethod<
        [string, bigint],
        | { Ok: bigint }
        | {
              Err:
                  | {
                        GenericError: { message: string; error_code: bigint };
                    }
                  | { TemporarilyUnavailable: null }
                  | { BadBurn: { min_burn_amount: bigint } }
                  | { Duplicate: { duplicate_of: bigint } }
                  | { BadFee: { expected_fee: bigint } }
                  | { CreatedInFuture: { ledger_time: bigint } }
                  | { TooOld: null }
                  | { InsufficientFunds: { balance: bigint } };
          }
    >;
    updateBalance: ActorMethod<
        [],
        | {
              Ok: Array<
                  | {
                        ValueTooSmall: {
                            height: number;
                            value: bigint;
                            outpoint: {
                                txid: Uint8Array | number[];
                                vout: number;
                            };
                        };
                    }
                  | {
                        Tainted: {
                            height: number;
                            value: bigint;
                            outpoint: {
                                txid: Uint8Array | number[];
                                vout: number;
                            };
                        };
                    }
                  | {
                        Minted: {
                            minted_amount: bigint;
                            block_index: bigint;
                            utxo: {
                                height: number;
                                value: bigint;
                                outpoint: {
                                    txid: Uint8Array | number[];
                                    vout: number;
                                };
                            };
                        };
                    }
                  | {
                        Checked: {
                            height: number;
                            value: bigint;
                            outpoint: {
                                txid: Uint8Array | number[];
                                vout: number;
                            };
                        };
                    }
              >;
          }
        | {
              Err:
                  | {
                        GenericError: {
                            error_message: string;
                            error_code: bigint;
                        };
                    }
                  | { TemporarilyUnavailable: string }
                  | { AlreadyProcessing: null }
                  | {
                        NoNewUtxos: {
                            required_confirmations: number;
                            current_confirmations: [] | [number];
                        };
                    };
          }
    >;
}
