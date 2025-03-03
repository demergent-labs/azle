# Benchmarks for api

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 13_571_083_300 | 10_629_023_320 | $0.0141330934 | $14_133.09        | <font color="green">-57_025</font> |
| 1   | http_request_update | 101_993_927    | 41_387_570     | $0.0000550318 | $55.03            | <font color="green">-63_712</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 13_571_140_325 | 10_629_046_130 | $0.0141331238 | $14_133.12        |
| 1   | http_request_update | 102_057_639    | 41_413_055     | $0.0000550657 | $55.06            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
