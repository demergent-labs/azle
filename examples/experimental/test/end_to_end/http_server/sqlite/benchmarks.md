# Benchmarks for sqlite

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | postUpgrade         | 11_988_770_518 | 9_196_098_207 | $0.0122277759 | $12_227.77        | <font color="red">+73_939_584</font>   |
| 1   | http_request_update | 148_017_434    | 59_796_973    | $0.0000795102 | $79.51            | <font color="green">-12_153_847</font> |
| 2   | http_request_update | 75_263_416     | 30_695_366    | $0.0000408147 | $40.81            | <font color="red">+131_663</font>      |
| 3   | http_request_update | 143_974_325    | 58_179_730    | $0.0000773598 | $77.35            | <font color="green">-202_668</font>    |
| 4   | http_request_update | 83_233_993     | 33_883_597    | $0.0000450540 | $45.05            | <font color="red">+54_769</font>       |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 11_914_830_934 | 9_166_522_373 | $0.0121884498 | $12_188.44        |
| 1   | http_request_update | 160_171_281    | 64_658_512    | $0.0000859745 | $85.97            |
| 2   | http_request_update | 75_131_753     | 30_642_701    | $0.0000407447 | $40.74            |
| 3   | http_request_update | 144_176_993    | 58_260_797    | $0.0000774676 | $77.46            |
| 4   | http_request_update | 83_179_224     | 33_861_689    | $0.0000450249 | $45.02            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
