#!/bin/bash

read -r -d '' argument << CANDID
(variant {
    Init = record {
        minting_account = record {
            owner = principal "bd3sg-teaaa-aaaaa-qaaba-cai"
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

dfx deploy ckbtc --specified-id be2us-64aaa-aaaaa-qaabq-cai --argument "$argument"
