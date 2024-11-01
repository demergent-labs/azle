# Benchmarks for func_types

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                             | 1_360_370_814 | 944_738_325 | $0.0012561902 | $1_256.19         | <font color="red">+318_233_781</font> |
| 1   | getNotifierFromNotifiersCanister | 1_657_008     | 1_252_803   | $0.0000016658 | $1.66             | <font color="green">-1_409</font>     |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                             | 1_042_137_033 | 817_444_813 | $0.0010869318 | $1_086.93         |
| 1   | getNotifierFromNotifiersCanister | 1_658_417     | 1_253_366   | $0.0000016666 | $1.66             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
