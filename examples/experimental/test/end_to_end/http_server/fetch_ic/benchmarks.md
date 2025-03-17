⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for backend

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_530_563_146 | 5_812_815_258 | $0.0077291261 | $7_729.12         | <font color="red">+4_617_491</font> |
| 1   | http_request_update | 55_295_241    | 22_708_096    | $0.0000301943 | $30.19            | <font color="green">-66_127</font>  |
| 2   | http_request_update | 48_786_602    | 20_104_640    | $0.0000267325 | $26.73            | <font color="green">-1_302</font>   |
| 3   | http_request_update | 49_094_286    | 20_227_714    | $0.0000268962 | $26.89            | <font color="green">-43_375</font>  |
| 4   | http_request_update | 48_779_707    | 20_101_882    | $0.0000267289 | $26.72            | <font color="green">-55_580</font>  |
| 5   | http_request_update | 48_974_622    | 20_179_848    | $0.0000268325 | $26.83            | <font color="green">-55_780</font>  |
| 6   | http_request_update | 46_810_505    | 19_314_202    | $0.0000256815 | $25.68            | <font color="green">-46_873</font>  |
| 7   | http_request_update | 37_323_262    | 15_519_304    | $0.0000206356 | $20.63            | <font color="green">-72_471</font>  |

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
