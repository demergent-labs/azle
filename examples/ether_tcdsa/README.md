# Ethereum Interaction Threshold ECDSA and HTTP

## Table of Contents

1. [Quick Start](#quick-start)
1. [Private Ethereum Network](#private-ethereum-network)
    1. [Install Geth](#install-geth)
    1. [Initialize Test Network](#initialize-the-network)
    1. [Create Ethereum Accounts](#create-ethereum-accounts)
    1. [Start Network](#start-network)
1. [Interacting with the Ethereum Network](#interacting-with-the-ethereum-network)
1. [Notes](#notes)
1. [Resources](#resources)

## Quick Start

This guide assumes that you have followed the [installation instructions for
azle](https://github.com/demergent-labs/azle#readme). All commands are written
as if your are running them from the `azle/examples/ether_tcdsa` directory.

1. Set up a private Ethereum test network
    1. Install Geth
        ```
        sudo add-apt-repository -y ppa:ethereum/ethereum
        sudo apt-get update
        sudo apt-get install ethereum
        ```
    1. Initialize the network
        ```
        geth init geth/genesis.json
        ```
    1. Add the test account to be used as the etherbase
        ```
        geth account import --password password/password.txt keys/test_account.txt
        ```
    1. Start up the network
        ```
        geth --networkid 12345 --maxpeers 0 --http --http.addr 0.0.0.0 --mine --miner.etherbase 0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1 --unlock 0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1 --password password/password.txt --allow-insecure-unlock
        ```
1. Install dependencies
    ```
    npm install
    ```
1. Deploy canister

    ```
    dfx canister create azle
    dfx build azle
    dfx canister install azle --wasm "target/wasm32-unknown-unknown/release/azle.wasm.gz"
    ```

1. Call canister method
    ```
    dfx canister call azle do_transfer
    ```

## Private Ethereum Network

We decided to go with a private network instead of one of the public test nets;
we felt like the additional startup cost would be worth the increased
flexibility and repeatability for our tests.

Having a private ethereum network allows you to run tests on a Ethereum network
without needing to spend actual ether. You are also able to configure a lot of
the behavior of the network so that your tests can run however you'd like.

We used [Go Ethereum (Geth)](https://geth.ethereum.org/) since it is popular and well documented.

### Install Geth

For the most up-to-date instruction look for the installation instructions on
the [Geth
Website](https://geth.ethereum.org/docs/install-and-build/installing-geth).

For Ubuntu users you can use PPAs
(These are simplified version of what's on the geth website)

```
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```

### Initialize The Network

First thing is create the genesis block for your test network.

```
geth init geth/genesis.json
```

Here is what our genesis block looks like.

<!-- TODO explain the parts of the genesis.json file -->
<!-- TODO do we need to have the test account public key in the extra data? What is the extra data? -->

```
{
  "config": {
    "chainId": 12345,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "berlinBlock": 0,
    "clique": {
      "period": 5,
      "epoch": 30000
    }
  },
  "difficulty": "1",
  "gasLimit": "8000000",
  "extradata": "0x00000000000000000000000000000000000000000000000000000000000000007df9a875a174b3bc565e6424a0050ebc1b2d1d820000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "alloc": {
    "0xC7d1556d0493bFE48CD1FF307E45a75528c7d3D8": { "balance": "0x800000" },
    "0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1": { "balance": "0x0de0b6b3a7640000" }
  }
}
```

### Create Ethereum Accounts

For this example we are using the following public/private key pair.

#### private key

```
0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db
```

#### public key

```
0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64
```

For your convenience here is the mnemonic and address for this key.

#### mnemonic

```
"announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
```

#### address

```
0x71cb05ee1b1f506ff321da3dac38f25c0c9ce6e1
```

<!-- TODO How do you generate a private/public key pair? This might not be within the scope of this project -->
<!-- TODO How do you generate an address from a public key? -->

After we have the keys ready to go with have to add them as an account on our network.

```
geth account import --password test_password.txt test_private_key.txt
```

### Start Network

Now everything is set up and we are ready to start it up. We just need to run this behemoth

```
geth --networkid 12345 --maxpeers 0 --http --mine --miner.etherbase 0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1 --unlock 0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1 --password password/password.txt --allow-insecure-unlock
```

| Flag              | Description                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| --networkid       | is the same as the chainID specified in the genesis.json                                        |
| --maxpeers        | is 0 since we only need one node on the network for our tests                                   |
| --http            | enables the use of JSON RPC which we need to communicate with our network from the azle example |
| --mine            | enables mining on our network without which the transactions we make will never be finalized    |
| --miner.etherbase | indicates which account will be doing the mining and getting the rewards for it                 |
| --unlock          | indicates that we want to unlock the specified account so that it can be used for mining        |
| --password        | is the path to the file that has the password on it                                             |

## Interacting with the Ethereum Network

Now that our private network is live we can start interacting with it through
HTTP thanks to the JSON RPC API. We can follow the [JSON PRC
documentation](https://ethereum.org/en/developers/docs/apis/json-rpc/) to know
the shape of the json object for the call we want to make and then we send
it over in an HTTP post.

For this example we are mostly going to be using
[`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)
to send already signed messages to our private network.

## Notes

I tried for quite some time to use the docker image ethereum/client-go for this
test. While the set up was initially simpler the interaction was a lot more
difficult since each command ended up being a new container. I eventually found
it much simpler to just use geth directly.

## Resources

[Ethereum Accounts](https://ethereum.org/en/developers/docs/accounts/)<br>
[Ethereum Transactions](https://ethereum.org/en/developers/docs/transactions/)<br>
[JSON RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/)<br>
[npm keccak library](https://www.npmjs.com/package/keccak)<br>
[ethers library docs](https://docs.ethers.io/v5/)<br>
[Installing Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth)<br>
[Geth CLI](https://geth.ethereum.org/docs/interface/command-line-options)<br>
[How to Create Private Ethereum Blockchain by Yuri Musienko](https://merehead.com/blog/how-to-create-private-ethereum-blockchain/)</br>
[CPU Mining with Geth](https://geth.ethereum.org/docs/interface/mining)
