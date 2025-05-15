#!/bin/bash

read -r -d '' argument << CANDID
(variant {
    Init = record {
        btc_network = variant { Regtest };
        min_confirmations=opt 1;
        ledger_id = principal "uxrrr-q7777-77774-qaaaq-cai";
        kyt_principal = opt principal "uzt4z-lp777-77774-qaabq-cai";
        ecdsa_key_name = "dfx_test_key";
        retrieve_btc_min_amount = 5_000;
        max_time_in_queue_nanos = 420_000_000_000;
        mode = variant {GeneralAvailability}
    }
})
CANDID

dfx deploy minter --specified-id umunu-kh777-77774-qaaca-cai --argument "$argument"
