⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for fs

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_526_605_981 | 5_811_232_392 | $0.0077270214 | $7_727.02         | <font color="red">+4_724_405</font> |
| 1   | http_request_update | 54_389_592    | 22_345_836    | $0.0000297126 | $29.71            | <font color="green">-364_029</font> |
| 2   | http_request_update | 48_334_790    | 19_923_916    | $0.0000264922 | $26.49            | <font color="green">-501_031</font> |
| 3   | http_request_update | 47_198_910    | 19_469_564    | $0.0000258881 | $25.88            | <font color="green">-511_616</font> |
| 4   | http_request_update | 46_280_785    | 19_102_314    | $0.0000253998 | $25.39            | <font color="green">-638_899</font> |
| 5   | http_request_update | 46_782_101    | 19_302_840    | $0.0000256664 | $25.66            | <font color="green">-428_034</font> |
| 6   | http_request_update | 46_328_252    | 19_121_300    | $0.0000254250 | $25.42            | <font color="green">-495_548</font> |
| 7   | http_request_update | 46_337_797    | 19_125_118    | $0.0000254301 | $25.43            | <font color="green">-377_192</font> |
| 8   | http_request_update | 45_735_584    | 18_884_233    | $0.0000251098 | $25.10            | <font color="green">-360_527</font> |

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
