# Benchmarks for func_types

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                             | 4_855_798_620 | 3_542_909_448 | $0.0047109004 | $4_710.90         | <font color="green">-16_154</font> |
| 1   | getNotifierFromNotifiersCanister | 10_532_215    | 4_802_886     | $0.0000063863 | $6.38             | <font color="red">+11_305</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                             | 4_855_814_774 | 3_542_915_909 | $0.0047109090 | $4_710.90         |
| 1   | getNotifierFromNotifiersCanister | 10_520_910    | 4_798_364     | $0.0000063802 | $6.38             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
