# Benchmarks for fs

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 7_525_399_443 | 5_810_749_777 | $0.0077263797 | $7_726.37         | <font color="green">-755_286_205</font> |
| 1   | http_request_update | 54_969_641    | 22_577_856    | $0.0000300211 | $30.02            | <font color="green">-741_268</font>     |
| 2   | http_request_update | 49_099_367    | 20_229_746    | $0.0000268989 | $26.89            | <font color="green">-678_298</font>     |
| 3   | http_request_update | 47_925_406    | 19_760_162    | $0.0000262745 | $26.27            | <font color="green">-781_324</font>     |
| 4   | http_request_update | 47_179_505    | 19_461_802    | $0.0000258778 | $25.87            | <font color="green">-781_106</font>     |
| 5   | http_request_update | 47_494_096    | 19_587_638    | $0.0000260451 | $26.04            | <font color="green">-407_094</font>     |
| 6   | http_request_update | 47_145_967    | 19_448_386    | $0.0000258599 | $25.85            | <font color="green">-664_076</font>     |
| 7   | http_request_update | 46_945_144    | 19_368_057    | $0.0000257531 | $25.75            | <font color="green">-655_980</font>     |
| 8   | http_request_update | 46_256_593    | 19_092_637    | $0.0000253869 | $25.38            | <font color="green">-697_315</font>     |

## Baseline benchmarks Azle version: 0.25.0

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

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
