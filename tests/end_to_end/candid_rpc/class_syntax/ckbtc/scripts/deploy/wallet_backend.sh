#!/bin/bash

export CK_BTC_PRINCIPAL=be2us-64aaa-aaaaa-qaabq-cai
export MINTER_PRINCIPAL=bd3sg-teaaa-aaaaa-qaaba-cai

dfx deploy wallet_backend --specified-id 7ugoi-yiaaa-aaaaa-aabaa-cai
dfx generate wallet_backend
