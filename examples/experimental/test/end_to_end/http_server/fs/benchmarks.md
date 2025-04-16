# Benchmarks for fs

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_574_922_762 | 5_830_559_104 | $0.0077527195 | $7_752.71         | <font color="red">+48_316_781</font> |
| 1   | http_request_update | 54_513_115    | 22_395_246    | $0.0000297783 | $29.77            | <font color="red">+123_523</font>    |
| 2   | http_request_update | 48_401_139    | 19_950_455    | $0.0000265275 | $26.52            | <font color="red">+66_349</font>     |
| 3   | http_request_update | 47_726_285    | 19_680_514    | $0.0000261686 | $26.16            | <font color="red">+527_375</font>    |
| 4   | http_request_update | 46_413_089    | 19_155_235    | $0.0000254701 | $25.47            | <font color="red">+132_304</font>    |
| 5   | http_request_update | 46_951_584    | 19_370_633    | $0.0000257565 | $25.75            | <font color="red">+169_483</font>    |
| 6   | http_request_update | 46_428_401    | 19_161_360    | $0.0000254783 | $25.47            | <font color="red">+100_149</font>    |
| 7   | http_request_update | 46_509_672    | 19_193_868    | $0.0000255215 | $25.52            | <font color="red">+171_875</font>    |
| 8   | http_request_update | 45_826_136    | 18_920_454    | $0.0000251580 | $25.15            | <font color="red">+90_552</font>     |

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
