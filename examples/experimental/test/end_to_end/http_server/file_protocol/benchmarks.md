# Benchmarks for backend

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                    |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | 1           | 50_500_440   | 55_500_440 | $0.0000760356 | $76.03            | <font color="green">-7_472_232_334</font> |
| 1   | 1           | 44_059_414   | 49_059_414 | $0.0000672114 | $67.21            | <font color="green">-13_043_609</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_522_732_774 | 7_527_732_774 | $0.0103129939 | $10_312.99        |
| 1   | http_request_update | 57_103_023    | 62_103_023    | $0.0000850811 | $85.08            |
| 2   | http_request_update | 50_682_911    | 55_682_911    | $0.0000762856 | $76.28            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
