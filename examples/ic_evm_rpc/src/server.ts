import { serialize, Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.post('/eth-get-block-by-number/:blockNumber', async (req, res) => {
        const response = await fetch(
            `icp://be2us-64aaa-aaaaa-qaabq-cai/eth_getBlockByNumber`,
            {
                body: serialize({
                    candidPath: '/src/evm_rpc.did',
                    args: [
                        {
                            EthMainnet: [
                                {
                                    PublicNode: null
                                }
                            ]
                        },
                        [],
                        {
                            Number: BigInt(req.params.blockNumber)
                        }
                    ]
                })
            }
        );
        const responseJson = await response.json();

        res.json(responseJson);
    });

    return app.listen();
});
