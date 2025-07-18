# Benchmarks for sqlite

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade         | 11_726_701_141 | 9_091_270_456 | $0.0120883896 | $12_088.38        | <font color="green">-191_844_805</font> |
| 1   | http_request_update | 151_439_396    | 61_165_758    | $0.0000813303 | $81.33            | <font color="red">+3_836_645</font>     |
| 2   | http_request_update | 75_168_305     | 30_657_322    | $0.0000407641 | $40.76            | <font color="red">+438_810</font>       |
| 3   | http_request_update | 144_165_504    | 58_256_201    | $0.0000774615 | $77.46            | <font color="red">+463_722</font>       |
| 4   | http_request_update | 83_288_415     | 33_905_366    | $0.0000450829 | $45.08            | <font color="red">+262_038</font>       |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 11_918_545_946 | 9_168_008_378 | $0.0121904257 | $12_190.42        |
| 1   | http_request_update | 147_602_751    | 59_631_100    | $0.0000792897 | $79.28            |
| 2   | http_request_update | 74_729_495     | 30_481_798    | $0.0000405307 | $40.53            |
| 3   | http_request_update | 143_701_782    | 58_070_712    | $0.0000772149 | $77.21            |
| 4   | http_request_update | 83_026_377     | 33_800_550    | $0.0000449436 | $44.94            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
