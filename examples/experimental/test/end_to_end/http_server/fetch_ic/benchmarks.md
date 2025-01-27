# Benchmarks for backend

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_290_604_383 | 6_516_831_753 | $0.0086652357 | $8_665.23         |
| 1   | http_request_update | 56_164_745    | 23_055_898    | $0.0000306567 | $30.65            |
| 2   | http_request_update | 49_641_086    | 20_446_434    | $0.0000271870 | $27.18            |
| 3   | http_request_update | 49_931_889    | 20_562_755    | $0.0000273417 | $27.34            |
| 4   | http_request_update | 49_648_559    | 20_449_423    | $0.0000271910 | $27.19            |
| 5   | http_request_update | 49_827_060    | 20_520_824    | $0.0000272859 | $27.28            |
| 6   | http_request_update | 47_647_308    | 19_648_923    | $0.0000261266 | $26.12            |
| 7   | http_request_update | 38_006_665    | 15_792_666    | $0.0000209990 | $20.99            |

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
