# Benchmarks for fs

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_574_340_108 | 5_830_326_043 | $0.0077524096 | $7_752.40         | <font color="red">+52_458_532</font> |
| 1   | http_request_update | 54_435_059    | 22_364_023    | $0.0000297368 | $29.73            | <font color="green">-318_562</font>  |
| 2   | http_request_update | 48_316_449    | 19_916_579    | $0.0000264825 | $26.48            | <font color="green">-519_372</font>  |
| 3   | http_request_update | 47_689_954    | 19_665_981    | $0.0000261493 | $26.14            | <font color="green">-20_572</font>   |
| 4   | http_request_update | 46_353_943    | 19_131_577    | $0.0000254387 | $25.43            | <font color="green">-565_741</font>  |
| 5   | http_request_update | 46_903_067    | 19_351_226    | $0.0000257307 | $25.73            | <font color="green">-307_068</font>  |
| 6   | http_request_update | 46_394_084    | 19_147_633    | $0.0000254600 | $25.46            | <font color="green">-429_716</font>  |
| 7   | http_request_update | 46_456_528    | 19_172_611    | $0.0000254932 | $25.49            | <font color="green">-258_461</font>  |
| 8   | http_request_update | 45_738_198    | 18_885_279    | $0.0000251112 | $25.11            | <font color="green">-357_913</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_521_881_576 | 5_809_342_630 | $0.0077245086 | $7_724.50         |
| 1   | http_request_update | 54_753_621    | 22_491_448    | $0.0000299062 | $29.90            |
| 2   | http_request_update | 48_835_821    | 20_124_328    | $0.0000267587 | $26.75            |
| 3   | http_request_update | 47_710_526    | 19_674_210    | $0.0000261602 | $26.16            |
| 4   | http_request_update | 46_919_684    | 19_357_873    | $0.0000257396 | $25.73            |
| 5   | http_request_update | 47_210_135    | 19_474_054    | $0.0000258941 | $25.89            |
| 6   | http_request_update | 46_823_800    | 19_319_520    | $0.0000256886 | $25.68            |
| 7   | http_request_update | 46_714_989    | 19_275_995    | $0.0000256307 | $25.63            |
| 8   | http_request_update | 46_096_111    | 19_028_444    | $0.0000253016 | $25.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
