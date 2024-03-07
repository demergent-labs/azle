export let canisterAddress: {
    value: string | null;
} = {
    value: null
};

export const chainId = 11_155_111; // TODO hard-coded to Sepolia for the moment

export const RpcSource = {
    EthSepolia: [
        [
            {
                PublicNode: null
            }
            // {
            //     Alchemy: null
            // },
            // {
            //     Ankr: null
            // }
        ]
    ]
};

export const JsonRpcSource = {
    // TODO figure out why JsonRpcSource and RpcSource are different
    // TODO Is this coming to consensus amongst multiple providers?
    // Chain: chainId // Sepolia
    Custom: {
        url: 'https://ethereum-sepolia-rpc.publicnode.com',
        headers: []
    }
};
