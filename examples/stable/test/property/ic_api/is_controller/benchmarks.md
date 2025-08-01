# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | updateIsController | 1_319_086    | 1_117_634 | $0.0000014861 | $1.48             | <font color="red">+1_292</font> |
| 1   | updateIsController | 1_277_147    | 1_100_858 | $0.0000014638 | $1.46             | <font color="red">+8_431</font> |
| 2   | updateIsController | 1_276_418    | 1_100_567 | $0.0000014634 | $1.46             | <font color="red">+4_526</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | updateIsController | 1_317_794    | 1_117_117 | $0.0000014854 | $1.48             |
| 1   | updateIsController | 1_268_716    | 1_097_486 | $0.0000014593 | $1.45             |
| 2   | updateIsController | 1_271_892    | 1_098_756 | $0.0000014610 | $1.46             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
