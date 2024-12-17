#!/bin/bash

block_height=$(.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf  getblockcount)

for ((i=1; i<=$block_height; i++))
do
    block_hash=$(.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf  getblockhash $i)
    echo "Block $i: $block_hash"
done
