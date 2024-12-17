# Benchmarks for sqlite

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | postUpgrade         | 12_667_670_004 | 9_867_658_001 | $0.0131207288 | $13_120.72        | <font color="red">+105_608_647</font>  |
| 1   | http_request_update | 147_822_577    | 59_719_030    | $0.0000794066 | $79.40            | <font color="green">-553_518</font>    |
| 2   | http_request_update | 75_106_202     | 30_632_480    | $0.0000407311 | $40.73            | <font color="green">-487_613</font>    |
| 3   | http_request_update | 143_240_346    | 57_886_138    | $0.0000769695 | $76.96            | <font color="green">-20_645_740</font> |
| 4   | http_request_update | 83_039_601     | 33_805_840    | $0.0000449506 | $44.95            | <font color="green">-741_956</font>    |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 12_562_061_357 | 9_825_414_542 | $0.0130645590 | $13_064.55        |
| 1   | http_request_update | 148_376_095    | 59_940_438    | $0.0000797010 | $79.70            |
| 2   | http_request_update | 75_593_815     | 30_827_526    | $0.0000409904 | $40.99            |
| 3   | http_request_update | 163_886_086    | 66_144_434    | $0.0000879503 | $87.95            |
| 4   | http_request_update | 83_781_557     | 34_102_622    | $0.0000453452 | $45.34            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
