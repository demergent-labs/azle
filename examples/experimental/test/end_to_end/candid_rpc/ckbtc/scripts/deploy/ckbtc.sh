#!/bin/bash

read -r -d '' argument << CANDID
(variant {
    Init = record {
        minting_account = record {
            owner = principal "umunu-kh777-77774-qaaca-cai"
        };
        transfer_fee = 0 : nat64;
        token_symbol = "ckBTC";
        token_name = "ckBTC";
        metadata = vec {};
        initial_balances = vec {};
        archive_options = record {
            num_blocks_to_archive = 0 : nat64;
            trigger_threshold = 0 : nat64;
            controller_id = principal "aaaaa-aa"
        }
    }
})
CANDID

dfx deploy ckbtc --specified-id uxrrr-q7777-77774-qaaaq-cai --argument "$argument"
