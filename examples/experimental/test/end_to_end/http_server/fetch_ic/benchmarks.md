# Benchmarks for backend

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | init                | 7_526_353_517 | 5_811_131_406 | $0.0077268871 | $7_726.88         | <font color="red">+647_658</font> |
| 1   | http_request_update | 55_368_951    | 22_737_580    | $0.0000302335 | $30.23            | <font color="red">+30_054</font>  |
| 2   | http_request_update | 48_842_434    | 20_126_973    | $0.0000267622 | $26.76            | <font color="red">+7_663</font>   |
| 3   | http_request_update | 49_153_803    | 20_251_521    | $0.0000269278 | $26.92            | <font color="red">+16_785</font>  |
| 4   | http_request_update | 48_850_762    | 20_130_304    | $0.0000267667 | $26.76            | <font color="red">+24_698</font>  |
| 5   | http_request_update | 49_016_015    | 20_196_406    | $0.0000268546 | $26.85            | <font color="green">-8_762</font> |
| 6   | http_request_update | 46_846_417    | 19_328_566    | $0.0000257006 | $25.70            | <font color="red">+40_432</font>  |
| 7   | http_request_update | 37_375_153    | 15_540_061    | $0.0000206632 | $20.66            | <font color="red">+24_855</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_525_705_859 | 5_810_872_343 | $0.0077265426 | $7_726.54         |
| 1   | http_request_update | 55_338_897    | 22_725_558    | $0.0000302175 | $30.21            |
| 2   | http_request_update | 48_834_771    | 20_123_908    | $0.0000267582 | $26.75            |
| 3   | http_request_update | 49_137_018    | 20_244_807    | $0.0000269189 | $26.91            |
| 4   | http_request_update | 48_826_064    | 20_120_425    | $0.0000267535 | $26.75            |
| 5   | http_request_update | 49_024_777    | 20_199_910    | $0.0000268592 | $26.85            |
| 6   | http_request_update | 46_805_985    | 19_312_394    | $0.0000256791 | $25.67            |
| 7   | http_request_update | 37_350_298    | 15_530_119    | $0.0000206499 | $20.64            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
