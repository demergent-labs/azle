# Benchmarks for fs

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_521_930_964 | 5_809_362_385 | $0.0077245349 | $7_724.53         | <font color="green">-3_468_479</font> |
| 1   | http_request_update | 54_734_096    | 22_483_638    | $0.0000298958 | $29.89            | <font color="green">-235_545</font>   |
| 2   | http_request_update | 48_852_725    | 20_131_090    | $0.0000267677 | $26.76            | <font color="green">-246_642</font>   |
| 3   | http_request_update | 47_689_545    | 19_665_818    | $0.0000261490 | $26.14            | <font color="green">-235_861</font>   |
| 4   | http_request_update | 46_879_111    | 19_341_644    | $0.0000257180 | $25.71            | <font color="green">-300_394</font>   |
| 5   | http_request_update | 47_215_916    | 19_476_366    | $0.0000258971 | $25.89            | <font color="green">-278_180</font>   |
| 6   | http_request_update | 46_839_127    | 19_325_650    | $0.0000256967 | $25.69            | <font color="green">-306_840</font>   |
| 7   | http_request_update | 46_687_240    | 19_264_896    | $0.0000256160 | $25.61            | <font color="green">-257_904</font>   |
| 8   | http_request_update | 46_069_977    | 19_017_990    | $0.0000252877 | $25.28            | <font color="green">-186_616</font>   |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_525_399_443 | 5_810_749_777 | $0.0077263797 | $7_726.37         |
| 1   | http_request_update | 54_969_641    | 22_577_856    | $0.0000300211 | $30.02            |
| 2   | http_request_update | 49_099_367    | 20_229_746    | $0.0000268989 | $26.89            |
| 3   | http_request_update | 47_925_406    | 19_760_162    | $0.0000262745 | $26.27            |
| 4   | http_request_update | 47_179_505    | 19_461_802    | $0.0000258778 | $25.87            |
| 5   | http_request_update | 47_494_096    | 19_587_638    | $0.0000260451 | $26.04            |
| 6   | http_request_update | 47_145_967    | 19_448_386    | $0.0000258599 | $25.85            |
| 7   | http_request_update | 46_945_144    | 19_368_057    | $0.0000257531 | $25.75            |
| 8   | http_request_update | 46_256_593    | 19_092_637    | $0.0000253869 | $25.38            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
