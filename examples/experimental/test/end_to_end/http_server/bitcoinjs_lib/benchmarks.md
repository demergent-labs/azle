# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 48_827_979_802 | 38_731_781_920 | $0.0515004885 | $51_500.48        | <font color="red">+526_102</font>     |
| 1   | http_request_update | 54_899_704     | 22_549_881     | $0.0000299839 | $29.98            | <font color="green">-14_565</font>    |
| 2   | http_request_update | 939_560_070    | 376_414_028    | $0.0005005064 | $500.50           | <font color="red">+6_779_701</font>   |
| 3   | http_request_update | 6_822_623_643  | 5_129_639_457  | $0.0068207277 | $6_820.72         | <font color="red">+27_915_301</font>  |
| 4   | http_request_update | 6_668_412_048  | 5_067_954_819  | $0.0067387075 | $6_738.70         | <font color="red">+24_453_481</font>  |
| 5   | http_request_update | 12_390_500_615 | 9_756_790_246  | $0.0129733113 | $12_973.31        | <font color="green">-829_123</font>   |
| 6   | http_request_update | 939_691_051    | 376_466_420    | $0.0005005761 | $500.57           | <font color="red">+7_215_626</font>   |
| 7   | http_request_update | 3_341_098_877  | 2_537_029_550  | $0.0033734121 | $3_373.41         | <font color="green">-826_171</font>   |
| 8   | http_request_update | 11_327_674_699 | 8_931_659_879  | $0.0118761602 | $11_876.16        | <font color="green">-831_806</font>   |
| 9   | http_request_update | 11_334_187_678 | 8_934_265_071  | $0.0118796242 | $11_879.62        | <font color="green">-1_886_873</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 48_827_453_700 | 38_731_571_480 | $0.0515002086 | $51_500.20        |
| 1   | http_request_update | 54_914_269     | 22_555_707     | $0.0000299916 | $29.99            |
| 2   | http_request_update | 932_780_369    | 373_702_147    | $0.0004969005 | $496.90           |
| 3   | http_request_update | 6_794_708_342  | 5_118_473_336  | $0.0068058804 | $6_805.88         |
| 4   | http_request_update | 6_643_958_567  | 5_058_173_426  | $0.0067257015 | $6_725.70         |
| 5   | http_request_update | 12_391_329_738 | 9_757_121_895  | $0.0129737523 | $12_973.75        |
| 6   | http_request_update | 932_475_425    | 373_580_170    | $0.0004967383 | $496.73           |
| 7   | http_request_update | 3_341_925_048  | 2_537_360_019  | $0.0033738515 | $3_373.85         |
| 8   | http_request_update | 11_328_506_505 | 8_931_992_602  | $0.0118766026 | $11_876.60        |
| 9   | http_request_update | 11_336_074_551 | 8_935_019_820  | $0.0118806278 | $11_880.62        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
