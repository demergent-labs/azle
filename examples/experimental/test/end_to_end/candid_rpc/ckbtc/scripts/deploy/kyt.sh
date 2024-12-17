#!/bin/bash

read -r -d '' argument << CANDID
(variant {
    InitArg = record {
      minter_id = principal "bd3sg-teaaa-aaaaa-qaaba-cai";
      maintainers = vec {
        principal "$(dfx identity get-principal)"
      };
      mode = variant { AcceptAll }
    }
  })
CANDID

dfx deploy kyt --specified-id bkyz2-fmaaa-aaaaa-qaaaq-cai --argument "$argument"

dfx canister call kyt set_api_key '(record { api_key = "" })'
