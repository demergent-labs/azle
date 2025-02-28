# Benchmarks for backend

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_525_960_360 | 5_810_974_144 | $0.0077266780 | $7_726.67         | <font color="red">+254_501</font>  |
| 1   | http_request_update | 55_360_767    | 22_734_306    | $0.0000302291 | $30.22            | <font color="red">+21_870</font>   |
| 2   | http_request_update | 48_809_809    | 20_113_923    | $0.0000267449 | $26.74            | <font color="green">-24_962</font> |
| 3   | http_request_update | 49_125_118    | 20_240_047    | $0.0000269126 | $26.91            | <font color="green">-11_900</font> |
| 4   | http_request_update | 48_836_060    | 20_124_424    | $0.0000267588 | $26.75            | <font color="red">+9_996</font>    |
| 5   | http_request_update | 48_994_543    | 20_187_817    | $0.0000268431 | $26.84            | <font color="green">-30_234</font> |
| 6   | http_request_update | 46_791_266    | 19_306_506    | $0.0000256713 | $25.67            | <font color="green">-14_719</font> |
| 7   | http_request_update | 37_381_110    | 15_542_444    | $0.0000206663 | $20.66            | <font color="red">+30_812</font>   |

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
