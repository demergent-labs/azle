⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for sqlite

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | postUpgrade         | 11_918_545_946 | 9_168_008_378 | $0.0121904257 | $12_190.42        | <font color="red">+3_715_012</font>    |
| 1   | http_request_update | 147_602_751    | 59_631_100    | $0.0000792897 | $79.28            | <font color="green">-12_568_530</font> |
| 2   | http_request_update | 74_729_495     | 30_481_798    | $0.0000405307 | $40.53            | <font color="green">-402_258</font>    |
| 3   | http_request_update | 143_701_782    | 58_070_712    | $0.0000772149 | $77.21            | <font color="green">-475_211</font>    |
| 4   | http_request_update | 83_026_377     | 33_800_550    | $0.0000449436 | $44.94            | <font color="green">-152_847</font>    |

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
