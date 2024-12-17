#!/bin/bash

read -r -d '' argument << CANDID
(variant {
    Init = record {
        btc_network = variant { Regtest };
        min_confirmations=opt 1;
        ledger_id = principal "be2us-64aaa-aaaaa-qaabq-cai";
        kyt_principal = opt principal "bkyz2-fmaaa-aaaaa-qaaaq-cai";
        ecdsa_key_name = "dfx_test_key";
        retrieve_btc_min_amount = 5_000;
        max_time_in_queue_nanos = 420_000_000_000;
        mode = variant {GeneralAvailability}
    }
})
CANDID

dfx deploy minter --specified-id bd3sg-teaaa-aaaaa-qaaba-cai --argument "$argument"
