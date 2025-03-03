# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 48_827_295_062 | 38_731_508_024 | $0.0515001243 | $51_500.12        | <font color="green">-684_740</font> |
| 1   | http_request_update | 54_891_798     | 22_546_719     | $0.0000299797 | $29.97            | <font color="green">-7_906</font>   |
| 2   | http_request_update | 939_653_419    | 376_451_367    | $0.0005005561 | $500.55           | <font color="red">+93_349</font>    |
| 3   | http_request_update | 6_822_795_080  | 5_129_708_032  | $0.0068208189 | $6_820.81         | <font color="red">+171_437</font>   |
| 4   | http_request_update | 6_668_918_697  | 5_068_157_478  | $0.0067389770 | $6_738.97         | <font color="red">+506_649</font>   |
| 5   | http_request_update | 12_390_994_370 | 9_756_987_748  | $0.0129735739 | $12_973.57        | <font color="red">+493_755</font>   |
| 6   | http_request_update | 939_561_075    | 376_414_430    | $0.0005005070 | $500.50           | <font color="green">-129_976</font> |
| 7   | http_request_update | 3_341_495_513  | 2_537_188_205  | $0.0033736230 | $3_373.62         | <font color="red">+396_636</font>   |
| 8   | http_request_update | 11_327_861_197 | 8_931_734_478  | $0.0118762594 | $11_876.25        | <font color="red">+186_498</font>   |
| 9   | http_request_update | 11_334_724_181 | 8_934_479_672  | $0.0118799096 | $11_879.90        | <font color="red">+536_503</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 48_827_979_802 | 38_731_781_920 | $0.0515004885 | $51_500.48        |
| 1   | http_request_update | 54_899_704     | 22_549_881     | $0.0000299839 | $29.98            |
| 2   | http_request_update | 939_560_070    | 376_414_028    | $0.0005005064 | $500.50           |
| 3   | http_request_update | 6_822_623_643  | 5_129_639_457  | $0.0068207277 | $6_820.72         |
| 4   | http_request_update | 6_668_412_048  | 5_067_954_819  | $0.0067387075 | $6_738.70         |
| 5   | http_request_update | 12_390_500_615 | 9_756_790_246  | $0.0129733113 | $12_973.31        |
| 6   | http_request_update | 939_691_051    | 376_466_420    | $0.0005005761 | $500.57           |
| 7   | http_request_update | 3_341_098_877  | 2_537_029_550  | $0.0033734121 | $3_373.41         |
| 8   | http_request_update | 11_327_674_699 | 8_931_659_879  | $0.0118761602 | $11_876.16        |
| 9   | http_request_update | 11_334_187_678 | 8_934_265_071  | $0.0118796242 | $11_879.62        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
