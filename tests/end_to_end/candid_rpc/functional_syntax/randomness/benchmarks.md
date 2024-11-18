# Benchmarks for randomness

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | postUpgrade  | 5_875_590_881 | 4_350_826_352 | $0.0057851633 | $5_785.16         | <font color="red">+629_843</font> |
| 1   | randomNumber | 1_034_394     | 1_003_757     | $0.0000013347 | $1.33             | <font color="red">+675</font>     |
| 2   | randomNumber | 1_019_867     | 997_946       | $0.0000013269 | $1.32             | <font color="green">-2_627</font> |
| 3   | randomNumber | 1_021_060     | 998_424       | $0.0000013276 | $1.32             | <font color="green">-1_527</font> |
| 4   | randomNumber | 1_021_432     | 998_572       | $0.0000013278 | $1.32             | <font color="red">+631</font>     |
| 5   | randomNumber | 1_020_906     | 998_362       | $0.0000013275 | $1.32             | <font color="green">-1_290</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade  | 5_874_961_038 | 4_350_574_415 | $0.0057848283 | $5_784.82         |
| 1   | randomNumber | 1_033_719     | 1_003_487     | $0.0000013343 | $1.33             |
| 2   | randomNumber | 1_022_494     | 998_997       | $0.0000013283 | $1.32             |
| 3   | randomNumber | 1_022_587     | 999_034       | $0.0000013284 | $1.32             |
| 4   | randomNumber | 1_020_801     | 998_320       | $0.0000013274 | $1.32             |
| 5   | randomNumber | 1_022_196     | 998_878       | $0.0000013282 | $1.32             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
