# Benchmarks for fs

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_280_685_648 | 6_512_864_259 | $0.0086599602 | $8_659.96         |
| 1   | http_request_update | 55_710_909    | 22_874_363    | $0.0000304154 | $30.41            |
| 2   | http_request_update | 49_777_665    | 20_501_066    | $0.0000272597 | $27.25            |
| 3   | http_request_update | 48_706_730    | 20_072_692    | $0.0000266901 | $26.69            |
| 4   | http_request_update | 47_960_611    | 19_774_244    | $0.0000262932 | $26.29            |
| 5   | http_request_update | 47_901_190    | 19_750_476    | $0.0000262616 | $26.26            |
| 6   | http_request_update | 47_810_043    | 19_714_017    | $0.0000262131 | $26.21            |
| 7   | http_request_update | 47_601_124    | 19_630_449    | $0.0000261020 | $26.10            |
| 8   | http_request_update | 46_953_908    | 19_371_563    | $0.0000257578 | $25.75            |

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
