# Benchmarks for fs

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_521_881_576 | 5_809_342_630 | $0.0077245086 | $7_724.50         | <font color="red">+92_307</font>   |
| 1   | http_request_update | 54_753_621    | 22_491_448    | $0.0000299062 | $29.90            | <font color="red">+30_310</font>   |
| 2   | http_request_update | 48_835_821    | 20_124_328    | $0.0000267587 | $26.75            | <font color="green">-10_040</font> |
| 3   | http_request_update | 47_710_526    | 19_674_210    | $0.0000261602 | $26.16            | <font color="red">+4_998</font>    |
| 4   | http_request_update | 46_919_684    | 19_357_873    | $0.0000257396 | $25.73            | <font color="red">+34_737</font>   |
| 5   | http_request_update | 47_210_135    | 19_474_054    | $0.0000258941 | $25.89            | <font color="red">+19_086</font>   |
| 6   | http_request_update | 46_823_800    | 19_319_520    | $0.0000256886 | $25.68            | <font color="green">-13_902</font> |
| 7   | http_request_update | 46_714_989    | 19_275_995    | $0.0000256307 | $25.63            | <font color="green">-8_537</font>  |
| 8   | http_request_update | 46_096_111    | 19_028_444    | $0.0000253016 | $25.30            | <font color="red">+55_349</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_521_789_269 | 5_809_305_707 | $0.0077244595 | $7_724.45         |
| 1   | http_request_update | 54_723_311    | 22_479_324    | $0.0000298901 | $29.89            |
| 2   | http_request_update | 48_845_861    | 20_128_344    | $0.0000267641 | $26.76            |
| 3   | http_request_update | 47_705_528    | 19_672_211    | $0.0000261575 | $26.15            |
| 4   | http_request_update | 46_884_947    | 19_343_978    | $0.0000257211 | $25.72            |
| 5   | http_request_update | 47_191_049    | 19_466_419    | $0.0000258839 | $25.88            |
| 6   | http_request_update | 46_837_702    | 19_325_080    | $0.0000256960 | $25.69            |
| 7   | http_request_update | 46_723_526    | 19_279_410    | $0.0000256353 | $25.63            |
| 8   | http_request_update | 46_040_762    | 19_006_304    | $0.0000252721 | $25.27            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
