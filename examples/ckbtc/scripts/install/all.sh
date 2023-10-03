#!/bin/bash

npm run install:bitcoin

# did file found here: https://github.com/dfinity/ic/blob/master/rs/rosetta-api/icrc1/ledger/ledger.did
npm run install:ckbtc

# did file found here: https://github.com/dfinity/internet-identity/blob/main/src/internet_identity/internet_identity.did
npm run install:internet_identity

# did file found here: https://github.com/dfinity/ic/blob/master/rs/bitcoin/ckbtc/kyt/kyt.did
npm run install:kyt

# did file found here: https://github.com/dfinity/ic/blob/master/rs/bitcoin/ckbtc/minter/ckbtc_minter.did
npm run install:minter

npm run install:wallet_frontend
