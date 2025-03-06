# Benchmarks for fs

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_521_879_316 | 5_809_341_726 | $0.0077245074 | $7_724.50         | <font color="green">-51_648</font> |
| 1   | http_request_update | 54_753_965    | 22_491_586    | $0.0000299064 | $29.90            | <font color="red">+19_869</font>   |
| 2   | http_request_update | 48_842_975    | 20_127_190    | $0.0000267625 | $26.76            | <font color="green">-9_750</font>  |
| 3   | http_request_update | 47_703_912    | 19_671_564    | $0.0000261567 | $26.15            | <font color="red">+14_367</font>   |
| 4   | http_request_update | 46_925_977    | 19_360_390    | $0.0000257429 | $25.74            | <font color="red">+46_866</font>   |
| 5   | http_request_update | 47_196_787    | 19_468_714    | $0.0000258870 | $25.88            | <font color="green">-19_129</font> |
| 6   | http_request_update | 46_840_591    | 19_326_236    | $0.0000256975 | $25.69            | <font color="red">+1_464</font>    |
| 7   | http_request_update | 46_707_850    | 19_273_140    | $0.0000256269 | $25.62            | <font color="red">+20_610</font>   |
| 8   | http_request_update | 46_049_697    | 19_009_878    | $0.0000252769 | $25.27            | <font color="green">-20_280</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_521_930_964 | 5_809_362_385 | $0.0077245349 | $7_724.53         |
| 1   | http_request_update | 54_734_096    | 22_483_638    | $0.0000298958 | $29.89            |
| 2   | http_request_update | 48_852_725    | 20_131_090    | $0.0000267677 | $26.76            |
| 3   | http_request_update | 47_689_545    | 19_665_818    | $0.0000261490 | $26.14            |
| 4   | http_request_update | 46_879_111    | 19_341_644    | $0.0000257180 | $25.71            |
| 5   | http_request_update | 47_215_916    | 19_476_366    | $0.0000258971 | $25.89            |
| 6   | http_request_update | 46_839_127    | 19_325_650    | $0.0000256967 | $25.69            |
| 7   | http_request_update | 46_687_240    | 19_264_896    | $0.0000256160 | $25.61            |
| 8   | http_request_update | 46_069_977    | 19_017_990    | $0.0000252877 | $25.28            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
