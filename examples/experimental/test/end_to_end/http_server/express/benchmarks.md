# Benchmarks for express

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_530_512_734 | 5_812_795_093 | $0.0077290993 | $7_729.09         | <font color="green">-597_600</font> |
| 1   | http_request_update | 53_623_532    | 22_039_412    | $0.0000293051 | $29.30            | <font color="green">-26_915</font>  |
| 2   | http_request_update | 47_224_576    | 19_479_830    | $0.0000259017 | $25.90            | <font color="red">+45_253</font>    |
| 3   | http_request_update | 44_236_481    | 18_284_592    | $0.0000243125 | $24.31            | <font color="red">+11_044</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_531_110_334 | 5_813_034_133 | $0.0077294171 | $7_729.41         |
| 1   | http_request_update | 53_650_447    | 22_050_178    | $0.0000293195 | $29.31            |
| 2   | http_request_update | 47_179_323    | 19_461_729    | $0.0000258777 | $25.87            |
| 3   | http_request_update | 44_225_437    | 18_280_174    | $0.0000243066 | $24.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
