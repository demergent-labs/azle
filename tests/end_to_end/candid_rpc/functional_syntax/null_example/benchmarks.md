# Benchmarks for null_example

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | setPartiallyNullRecord | 8_978_104    | 4_181_241 | $0.0000055597 | $5.55             | <font color="green">-8_887</font> |
| 1   | setSmallNullRecord     | 5_398_926    | 2_749_570 | $0.0000036560 | $3.65             | <font color="green">-3_228</font> |
| 2   | setLargeNullRecord     | 8_709_139    | 4_073_655 | $0.0000054166 | $5.41             | <font color="green">-8_991</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_986_991    | 4_184_796 | $0.0000055644 | $5.56             |
| 1   | setSmallNullRecord     | 5_402_154    | 2_750_861 | $0.0000036577 | $3.65             |
| 2   | setLargeNullRecord     | 8_718_130    | 4_077_252 | $0.0000054214 | $5.42             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
