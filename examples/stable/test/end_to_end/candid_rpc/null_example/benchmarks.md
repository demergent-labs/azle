# Benchmarks for null_example

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | setPartiallyNullRecord | 5_988_925    | 2_985_570 | $0.0000039698 | $3.96             | <font color="green">-9_692</font> |
| 1   | setSmallNullRecord     | 4_351_563    | 2_330_625 | $0.0000030990 | $3.09             | <font color="red">+6_892</font>   |
| 2   | setLargeNullRecord     | 5_669_861    | 2_857_944 | $0.0000038001 | $3.80             | <font color="green">-1_901</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 5_998_617    | 2_989_446 | $0.0000039750 | $3.97             |
| 1   | setSmallNullRecord     | 4_344_671    | 2_327_868 | $0.0000030953 | $3.09             |
| 2   | setLargeNullRecord     | 5_671_762    | 2_858_704 | $0.0000038011 | $3.80             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
