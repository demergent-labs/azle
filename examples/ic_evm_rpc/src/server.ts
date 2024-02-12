import { jsonStringify, serialize, Server } from 'azle';
import express from 'express';

export default Server(() => {
    const app = express();

    app.post('/eth_feeHistory', async (req, res) => {
        try {
            const response = await fetch(
                `icp://be2us-64aaa-aaaaa-qaabq-cai/eth_feeHistory`,
                {
                    body: serialize({
                        candidPath: '/src/evm_rpc.did',
                        args: [
                            {
                                EthMainnet: [
                                    [
                                        {
                                            Alchemy: null
                                        },
                                        {
                                            Ankr: null
                                        }
                                    ]
                                ]
                            },
                            [],
                            {
                                blockCount: 10,
                                newestBlock: {
                                    Finalized: null
                                },
                                rewardPercentiles: []
                            }
                        ],
                        cycles: 1_000_000_000
                    })
                }
            );
            const responseJson = await response.json();

            res.send(jsonStringify(responseJson));
        } catch (error: any) {
            console.log('error');
            console.log(error.message);
        }
    });

    return app.listen();
});
