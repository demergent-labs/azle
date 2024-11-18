# Benchmarks for persistent_storage

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade | 5_368_380_202 | 4_147_942_080 | $0.0055153941 | $5_515.39         | <font color="red">+3_298_905</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade | 5_365_081_297 | 4_146_622_518 | $0.0055136396 | $5_513.63         |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
