/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { execSync } from 'child_process';

const CLI = '.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf';

function getBlockTransactionCount() {
    try {
        const blockCount = parseInt(
            execSync(`${CLI} getblockcount`).toString()
        );

        for (let i = 1; i <= blockCount; i++) {
            const blockHash = execSync(`${CLI} getblockhash ${i}`)
                .toString()
                .trim();
            const blockInfo = JSON.parse(
                execSync(`${CLI} getblock ${blockHash}`).toString()
            );
            const transactionCount = blockInfo.tx.length;
            console.info(
                `Block ${i} (${blockHash}) has ${transactionCount} transactions.`
            );
        }
    } catch (err) {
        console.error(err);
    }
}

getBlockTransactionCount();
