# Basic Dao

https://github.com/dfinity/examples/tree/master/motoko/basic_dao

Deploy command

```bash
dfx deploy basic_dao --argument "(
    vec {
        record {
            owner = principal \"rrkah-fqaaa-aaaaa-aaaaq-cai\";
            tokens = record { amount_e8s = 100_000_000 };
        };
        record {
            owner = principal \"vsane-vq2o4-awwmq-qlf3d-253a4-yf3nz-rqz6a-4n5se-we6yw-bmdag-cae\";
            tokens = record { amount_e8s = 100_000_000 };
        };
    },
    vec {},
    record {
        transfer_fee = record { amount_e8s = 10_000 };
        proposal_vote_threshold = record { amount_e8s = 10_000_000 };
        proposal_submission_deposit = record { amount_e8s = 10_000 };
    }
)"

```
