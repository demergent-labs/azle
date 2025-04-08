# Benchmarks for http_counter

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_014_001_744 | 806_190_697 | $0.0010719676 | $1_071.96         |
| 1   | http_request_update | 30_100_276    | 12_630_110  | $0.0000167939 | $16.79            |
| 2   | http_request_update | 30_006_592    | 12_592_636  | $0.0000167441 | $16.74            |
| 3   | http_request_update | 30_078_803    | 12_621_521  | $0.0000167825 | $16.78            |

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
