# Benchmarks for api

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 13_647_014_680 | 10_659_395_872 | $0.0141734789 | $14_173.47        | <font color="red">+69_010_024</font> |
| 1   | http_request_update | 102_203_440    | 41_471_376     | $0.0000551432 | $55.14            | <font color="red">+244_413</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 13_578_004_656 | 10_631_791_862 | $0.0141367747 | $14_136.77        |
| 1   | http_request_update | 101_959_027    | 41_373_610     | $0.0000550132 | $55.01            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
