export type Wallet = {
    privKey: string;
    wif: string;
    pubKey: string;
    pubKeyHash: string;
    p2wpkh: string;
};

export type Wallets = {
    alice: Wallet;
    bob: Wallet;
};

export const wallets: Wallets = {
    alice: {
        privKey:
            '4dce80aad60aee8ea17c307ae00baa6cff261b780af68b86eedae36ba657dd81',
        wif: 'cQBwuzEBYQrbWKFZZFpgitRpdDDxUrT1nzvhDWhxMmFtWdRnrCSm',
        pubKey: '03745c9aceb84dcdeddf2c3cdc1edb0b0b5af2f9bf85612d73fa6394758eaee35d',
        pubKeyHash: 'fb8820f35effa054399540b8ca86040d8ddaa4d5',
        p2wpkh: 'bcrt1qlwyzpu67l7s9gwv4gzuv4psypkxa4fx4ggs05g'
    },
    bob: {
        privKey:
            '1d9944b5497b6b9ac6f52ac3bc077bc01610b8401d799eaa35e83b44ed858139',
        wif: 'cNaEjitvA19JZxWAFyCFMsm16TvGEmVAW3AkPnVr8E9vgwdZWMGV',
        pubKey: '027efbabf425077cdbceb73f6681c7ebe2ade74a65ea57ebcf0c42364d3822c590',
        pubKeyHash: '03f338e0f898ef40f1eb6734dc1f5aa72a4161f8',
        p2wpkh: 'bcrt1qq0en3c8cnrh5pu0tvu6dc8665u4yzc0cw9nweq'
    }
};
