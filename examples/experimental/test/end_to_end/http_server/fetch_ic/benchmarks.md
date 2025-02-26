# Benchmarks for backend

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_525_705_859 | 5_810_872_343 | $0.0077265426 | $7_726.54         | <font color="green">-3_284_753</font> |
| 1   | http_request_update | 55_338_897    | 22_725_558    | $0.0000302175 | $30.21            | <font color="green">-79_474</font>    |
| 2   | http_request_update | 48_834_771    | 20_123_908    | $0.0000267582 | $26.75            | <font color="green">-31_828</font>    |
| 3   | http_request_update | 49_137_018    | 20_244_807    | $0.0000269189 | $26.91            | <font color="green">-68_947</font>    |
| 4   | http_request_update | 48_826_064    | 20_120_425    | $0.0000267535 | $26.75            | <font color="green">-49_963</font>    |
| 5   | http_request_update | 49_024_777    | 20_199_910    | $0.0000268592 | $26.85            | <font color="green">-34_564</font>    |
| 6   | http_request_update | 46_805_985    | 19_312_394    | $0.0000256791 | $25.67            | <font color="green">-33_817</font>    |
| 7   | http_request_update | 37_350_298    | 15_530_119    | $0.0000206499 | $20.64            | <font color="green">-64_203</font>    |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_528_990_612 | 5_812_186_244 | $0.0077282897 | $7_728.28         |
| 1   | http_request_update | 55_418_371    | 22_757_348    | $0.0000302598 | $30.25            |
| 2   | http_request_update | 48_866_599    | 20_136_639    | $0.0000267751 | $26.77            |
| 3   | http_request_update | 49_205_965    | 20_272_386    | $0.0000269556 | $26.95            |
| 4   | http_request_update | 48_876_027    | 20_140_410    | $0.0000267801 | $26.78            |
| 5   | http_request_update | 49_059_341    | 20_213_736    | $0.0000268776 | $26.87            |
| 6   | http_request_update | 46_839_802    | 19_325_920    | $0.0000256971 | $25.69            |
| 7   | http_request_update | 37_414_501    | 15_555_800    | $0.0000206841 | $20.68            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
