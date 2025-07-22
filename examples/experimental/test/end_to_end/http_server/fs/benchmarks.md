# Benchmarks for fs

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_741_895_834 | 5_897_348_333 | $0.0078415272 | $7_841.52         | <font color="red">+215_289_853</font> |
| 1   | http_request_update | 54_421_451    | 22_358_580    | $0.0000297295 | $29.72            | <font color="red">+31_859</font>      |
| 2   | http_request_update | 48_345_611    | 19_928_244    | $0.0000264980 | $26.49            | <font color="red">+10_821</font>      |
| 3   | http_request_update | 47_652_746    | 19_651_098    | $0.0000261295 | $26.12            | <font color="red">+453_836</font>     |
| 4   | http_request_update | 46_291_828    | 19_106_731    | $0.0000254056 | $25.40            | <font color="red">+11_043</font>      |
| 5   | http_request_update | 46_868_241    | 19_337_296    | $0.0000257122 | $25.71            | <font color="red">+86_140</font>      |
| 6   | http_request_update | 46_335_982    | 19_124_392    | $0.0000254291 | $25.42            | <font color="red">+7_730</font>       |
| 7   | http_request_update | 46_452_725    | 19_171_090    | $0.0000254912 | $25.49            | <font color="red">+114_928</font>     |
| 8   | http_request_update | 45_768_309    | 18_897_323    | $0.0000251272 | $25.12            | <font color="red">+32_725</font>      |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_526_605_981 | 5_811_232_392 | $0.0077270214 | $7_727.02         |
| 1   | http_request_update | 54_389_592    | 22_345_836    | $0.0000297126 | $29.71            |
| 2   | http_request_update | 48_334_790    | 19_923_916    | $0.0000264922 | $26.49            |
| 3   | http_request_update | 47_198_910    | 19_469_564    | $0.0000258881 | $25.88            |
| 4   | http_request_update | 46_280_785    | 19_102_314    | $0.0000253998 | $25.39            |
| 5   | http_request_update | 46_782_101    | 19_302_840    | $0.0000256664 | $25.66            |
| 6   | http_request_update | 46_328_252    | 19_121_300    | $0.0000254250 | $25.42            |
| 7   | http_request_update | 46_337_797    | 19_125_118    | $0.0000254301 | $25.43            |
| 8   | http_request_update | 45_735_584    | 18_884_233    | $0.0000251098 | $25.10            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
