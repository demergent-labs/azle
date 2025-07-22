# Benchmarks for caller

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | echoThroughReject | 2_523_880    | 1_599_552 | $0.0000021269 | $2.12             | <font color="green">-41_169</font> |
| 1   | assertTypes       | 2_340_939    | 1_526_375 | $0.0000020296 | $2.02             | <font color="green">-71_347</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | echoThroughReject | 2_565_049    | 1_616_019 | $0.0000021488 | $2.14             |
| 1   | assertTypes       | 2_412_286    | 1_554_914 | $0.0000020675 | $2.06             |

# Benchmarks for rejector

## Current benchmarks Azle version: 0.32.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.30.0

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
