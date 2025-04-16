# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 1_113_902_054 | 846_150_821 | $0.0011251014 | $1_125.10         | <font color="red">+3_838_412</font> |
| 1   | ethGetBalance       | 28_817_227    | 12_116_890  | $0.0000161115 | $16.11            | <font color="red">+189_912</font>   |
| 2   | ethGetBalance       | 28_711_260    | 12_074_504  | $0.0000160551 | $16.05            | <font color="red">+152_628</font>   |
| 3   | ethGetBalance       | 28_762_597    | 12_095_038  | $0.0000160824 | $16.08            | <font color="red">+205_660</font>   |
| 4   | ethGetBlockByNumber | 27_527_700    | 11_601_080  | $0.0000154256 | $15.42            | <font color="red">+177_880</font>   |
| 5   | ethGetBlockByNumber | 27_548_692    | 11_609_476  | $0.0000154368 | $15.43            | <font color="red">+166_111</font>   |
| 6   | ethGetBlockByNumber | 27_540_185    | 11_606_074  | $0.0000154322 | $15.43            | <font color="red">+199_852</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_110_063_642 | 844_615_456 | $0.0011230598 | $1_123.05         |
| 1   | ethGetBalance       | 28_627_315    | 12_040_926  | $0.0000160105 | $16.01            |
| 2   | ethGetBalance       | 28_558_632    | 12_013_452  | $0.0000159739 | $15.97            |
| 3   | ethGetBalance       | 28_556_937    | 12_012_774  | $0.0000159730 | $15.97            |
| 4   | ethGetBlockByNumber | 27_349_820    | 11_529_928  | $0.0000153310 | $15.33            |
| 5   | ethGetBlockByNumber | 27_382_581    | 11_543_032  | $0.0000153484 | $15.34            |
| 6   | ethGetBlockByNumber | 27_340_333    | 11_526_133  | $0.0000153260 | $15.32            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
