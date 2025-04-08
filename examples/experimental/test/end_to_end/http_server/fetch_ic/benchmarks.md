# Benchmarks for backend

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_581_306_692 | 5_833_112_676 | $0.0077561149 | $7_756.11         | <font color="red">+55_361_037</font> |
| 1   | http_request_update | 55_421_187    | 22_758_474    | $0.0000302613 | $30.26            | <font color="red">+59_819</font>     |
| 2   | http_request_update | 48_880_818    | 20_142_327    | $0.0000267826 | $26.78            | <font color="red">+92_914</font>     |
| 3   | http_request_update | 49_163_041    | 20_255_216    | $0.0000269328 | $26.93            | <font color="red">+25_380</font>     |
| 4   | http_request_update | 48_885_170    | 20_144_068    | $0.0000267850 | $26.78            | <font color="red">+49_883</font>     |
| 5   | http_request_update | 49_095_605    | 20_228_242    | $0.0000268969 | $26.89            | <font color="red">+65_203</font>     |
| 6   | http_request_update | 46_959_352    | 19_373_740    | $0.0000257607 | $25.76            | <font color="red">+101_974</font>    |
| 7   | http_request_update | 37_468_425    | 15_577_370    | $0.0000207128 | $20.71            | <font color="red">+72_692</font>     |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_525_945_655 | 5_810_968_262 | $0.0077266702 | $7_726.67         |
| 1   | http_request_update | 55_361_368    | 22_734_547    | $0.0000302294 | $30.22            |
| 2   | http_request_update | 48_787_904    | 20_105_161    | $0.0000267332 | $26.73            |
| 3   | http_request_update | 49_137_661    | 20_245_064    | $0.0000269193 | $26.91            |
| 4   | http_request_update | 48_835_287    | 20_124_114    | $0.0000267584 | $26.75            |
| 5   | http_request_update | 49_030_402    | 20_202_160    | $0.0000268622 | $26.86            |
| 6   | http_request_update | 46_857_378    | 19_332_951    | $0.0000257064 | $25.70            |
| 7   | http_request_update | 37_395_733    | 15_548_293    | $0.0000206741 | $20.67            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
