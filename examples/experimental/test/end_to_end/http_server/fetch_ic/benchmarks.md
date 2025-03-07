# Benchmarks for backend

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_525_945_655 | 5_810_968_262 | $0.0077266702 | $7_726.67         | <font color="green">-14_705</font> |
| 1   | http_request_update | 55_361_368    | 22_734_547    | $0.0000302294 | $30.22            | <font color="red">+601</font>      |
| 2   | http_request_update | 48_787_904    | 20_105_161    | $0.0000267332 | $26.73            | <font color="green">-21_905</font> |
| 3   | http_request_update | 49_137_661    | 20_245_064    | $0.0000269193 | $26.91            | <font color="red">+12_543</font>   |
| 4   | http_request_update | 48_835_287    | 20_124_114    | $0.0000267584 | $26.75            | <font color="green">-773</font>    |
| 5   | http_request_update | 49_030_402    | 20_202_160    | $0.0000268622 | $26.86            | <font color="red">+35_859</font>   |
| 6   | http_request_update | 46_857_378    | 19_332_951    | $0.0000257064 | $25.70            | <font color="red">+66_112</font>   |
| 7   | http_request_update | 37_395_733    | 15_548_293    | $0.0000206741 | $20.67            | <font color="red">+14_623</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_525_960_360 | 5_810_974_144 | $0.0077266780 | $7_726.67         |
| 1   | http_request_update | 55_360_767    | 22_734_306    | $0.0000302291 | $30.22            |
| 2   | http_request_update | 48_809_809    | 20_113_923    | $0.0000267449 | $26.74            |
| 3   | http_request_update | 49_125_118    | 20_240_047    | $0.0000269126 | $26.91            |
| 4   | http_request_update | 48_836_060    | 20_124_424    | $0.0000267588 | $26.75            |
| 5   | http_request_update | 48_994_543    | 20_187_817    | $0.0000268431 | $26.84            |
| 6   | http_request_update | 46_791_266    | 19_306_506    | $0.0000256713 | $25.67            |
| 7   | http_request_update | 37_381_110    | 15_542_444    | $0.0000206663 | $20.66            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
