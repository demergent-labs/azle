#!/bin/bash

read -r -d '' argument << CANDID
(variant {
    InitArg = record {
      minter_id = principal "umunu-kh777-77774-qaaca-cai";
      maintainers = vec {
        principal "$(dfx identity get-principal)"
      };
      mode = variant { AcceptAll }
    }
  })
CANDID

dfx deploy kyt --specified-id uzt4z-lp777-77774-qaabq-cai --argument "$argument"

dfx canister call kyt set_api_key '(record { api_key = "" })'
