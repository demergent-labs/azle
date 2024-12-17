# Benchmarks for backend

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_255_655_115 | 6_502_852_046 | $0.0086466473 | $8_646.64         |
| 1   | http_request_update | 58_739_331    | 24_085_732    | $0.0000320261 | $32.02            |
| 2   | http_request_update | 52_360_946    | 21_534_378    | $0.0000286336 | $28.63            |
| 3   | http_request_update | 53_312_809    | 21_915_123    | $0.0000291399 | $29.13            |

## Baseline benchmarks Azle version: No previous benchmarks

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
