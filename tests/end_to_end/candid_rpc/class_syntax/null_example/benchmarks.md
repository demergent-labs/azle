# Benchmarks for null_example

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setPartiallyNullRecord | 5_669_758    | 2_857_903 | $0.0000038001 | $3.80             | <font color="red">+2_299</font>    |
| 1   | setSmallNullRecord     | 4_129_254    | 2_241_701 | $0.0000029807 | $2.98             | <font color="green">-7_942</font>  |
| 2   | setLargeNullRecord     | 5_373_706    | 2_739_482 | $0.0000036426 | $3.64             | <font color="green">-17_342</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 5_667_459    | 2_856_983 | $0.0000037988 | $3.79             |
| 1   | setSmallNullRecord     | 4_137_196    | 2_244_878 | $0.0000029849 | $2.98             |
| 2   | setLargeNullRecord     | 5_391_048    | 2_746_419 | $0.0000036518 | $3.65             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
