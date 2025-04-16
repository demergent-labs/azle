# Benchmarks for backend

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_581_800_691 | 5_833_310_276 | $0.0077563777 | $7_756.37         | <font color="red">+51_237_545</font> |
| 1   | http_request_update | 55_413_785    | 22_755_514    | $0.0000302573 | $30.25            | <font color="red">+118_544</font>    |
| 2   | http_request_update | 48_909_806    | 20_153_922    | $0.0000267981 | $26.79            | <font color="red">+123_204</font>    |
| 3   | http_request_update | 49_242_266    | 20_286_906    | $0.0000269749 | $26.97            | <font color="red">+147_980</font>    |
| 4   | http_request_update | 48_919_407    | 20_157_762    | $0.0000268032 | $26.80            | <font color="red">+139_700</font>    |
| 5   | http_request_update | 49_127_049    | 20_240_819    | $0.0000269136 | $26.91            | <font color="red">+152_427</font>    |
| 6   | http_request_update | 46_980_288    | 19_382_115    | $0.0000257718 | $25.77            | <font color="red">+169_783</font>    |
| 7   | http_request_update | 37_519_530    | 15_597_812    | $0.0000207399 | $20.73            | <font color="red">+196_268</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_530_563_146 | 5_812_815_258 | $0.0077291261 | $7_729.12         |
| 1   | http_request_update | 55_295_241    | 22_708_096    | $0.0000301943 | $30.19            |
| 2   | http_request_update | 48_786_602    | 20_104_640    | $0.0000267325 | $26.73            |
| 3   | http_request_update | 49_094_286    | 20_227_714    | $0.0000268962 | $26.89            |
| 4   | http_request_update | 48_779_707    | 20_101_882    | $0.0000267289 | $26.72            |
| 5   | http_request_update | 48_974_622    | 20_179_848    | $0.0000268325 | $26.83            |
| 6   | http_request_update | 46_810_505    | 19_314_202    | $0.0000256815 | $25.68            |
| 7   | http_request_update | 37_323_262    | 15_519_304    | $0.0000206356 | $20.63            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
