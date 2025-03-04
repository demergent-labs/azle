# Benchmarks for backend

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | init        | 7_517_192_740 | 5_807_467_096 | $0.0077220148 | $7_722.01         | <font color="red">+336_689</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 7_516_856_051 | 5_807_332_420 | $0.0077218357 | $7_721.83         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
