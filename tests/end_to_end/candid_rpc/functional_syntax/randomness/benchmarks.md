# Benchmarks for randomness

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ------------ | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | postUpgrade  | 5_875_560_744 | 4_350_814_297 | $0.0057851472 | $5_785.14         | <font color="red">+599_706</font> |
| 1   | randomNumber | 1_037_140     | 1_004_856     | $0.0000013361 | $1.33             | <font color="red">+3_421</font>   |
| 2   | randomNumber | 1_022_596     | 999_038       | $0.0000013284 | $1.32             | <font color="red">+102</font>     |
| 3   | randomNumber | 1_021_984     | 998_793       | $0.0000013281 | $1.32             | <font color="green">-603</font>   |
| 4   | randomNumber | 1_020_631     | 998_252       | $0.0000013273 | $1.32             | <font color="green">-170</font>   |
| 5   | randomNumber | 1_023_113     | 999_245       | $0.0000013287 | $1.32             | <font color="red">+917</font>     |

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
