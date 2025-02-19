# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init                | 1_110_669_562 | 844_857_824 | $0.0011233821 | $1_123.38         | <font color="green">-15_616_091</font> |
| 1   | ethGetBalance       | 28_665_501    | 12_056_200  | $0.0000160308 | $16.03            | <font color="green">-190_338</font>    |
| 2   | ethGetBalance       | 28_576_023    | 12_020_409  | $0.0000159832 | $15.98            | <font color="green">-212_794</font>    |
| 3   | ethGetBalance       | 28_610_526    | 12_034_210  | $0.0000160015 | $16.00            | <font color="green">-168_898</font>    |
| 4   | ethGetBlockByNumber | 27_395_488    | 11_548_195  | $0.0000153553 | $15.35            | <font color="green">-202_415</font>    |
| 5   | ethGetBlockByNumber | 27_439_198    | 11_565_679  | $0.0000153785 | $15.37            | <font color="green">-164_851</font>    |
| 6   | ethGetBlockByNumber | 27_391_013    | 11_546_405  | $0.0000153529 | $15.35            | <font color="green">-189_324</font>    |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_126_285_653 | 851_104_261 | $0.0011316878 | $1_131.68         |
| 1   | ethGetBalance       | 28_855_839    | 12_132_335  | $0.0000161320 | $16.13            |
| 2   | ethGetBalance       | 28_788_817    | 12_105_526  | $0.0000160964 | $16.09            |
| 3   | ethGetBalance       | 28_779_424    | 12_101_769  | $0.0000160914 | $16.09            |
| 4   | ethGetBlockByNumber | 27_597_903    | 11_629_161  | $0.0000154629 | $15.46            |
| 5   | ethGetBlockByNumber | 27_604_049    | 11_631_619  | $0.0000154662 | $15.46            |
| 6   | ethGetBlockByNumber | 27_580_337    | 11_622_134  | $0.0000154536 | $15.45            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
