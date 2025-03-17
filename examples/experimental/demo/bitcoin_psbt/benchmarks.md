⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 16_069_383_524 | 12_828_343_409 | $0.0170574634 | $17_057.46        | <font color="red">+10_342_766</font> |
| 1   | http_request_update | 174_857_808    | 70_533_123     | $0.0000937858 | $93.78            | <font color="green">-196_964</font>  |
| 2   | http_request_update | 174_945_895    | 70_568_358     | $0.0000938326 | $93.83            | <font color="red">+60_628</font>     |
| 3   | http_request_update | 175_857_033    | 70_932_813     | $0.0000943172 | $94.31            | <font color="red">+109_122</font>    |
| 4   | http_request_update | 175_046_892    | 70_608_756     | $0.0000938863 | $93.88            | <font color="red">+226_924</font>    |
| 5   | http_request_update | 174_830_914    | 70_522_365     | $0.0000937715 | $93.77            | <font color="green">-92_863</font>   |
| 6   | http_request_update | 175_659_132    | 70_853_652     | $0.0000942120 | $94.21            | <font color="green">-18_136</font>   |
| 7   | http_request_update | 174_999_547    | 70_589_818     | $0.0000938612 | $93.86            | <font color="red">+72_007</font>     |
| 8   | http_request_update | 177_781_587    | 71_702_634     | $0.0000953408 | $95.34            | <font color="red">+152_582</font>    |
| 9   | http_request_update | 173_617_736    | 70_037_094     | $0.0000931262 | $93.12            | <font color="green">-11_436</font>   |
| 10  | http_request_update | 175_452_480    | 70_770_992     | $0.0000941021 | $94.10            | <font color="red">+120_939</font>    |
| 11  | http_request_update | 182_734_362    | 73_683_744     | $0.0000979751 | $97.97            | <font color="red">+83_596</font>     |
| 12  | http_request_update | 175_243_072    | 70_687_228     | $0.0000939907 | $93.99            | <font color="green">-151_399</font>  |
| 13  | http_request_update | 174_839_078    | 70_525_631     | $0.0000937758 | $93.77            | <font color="green">-76_003</font>   |
| 14  | http_request_update | 175_796_808    | 70_908_723     | $0.0000942852 | $94.28            | <font color="red">+117_519</font>    |
| 15  | http_request_update | 173_671_050    | 70_058_420     | $0.0000931546 | $93.15            | <font color="red">+248_055</font>    |
| 16  | http_request_update | 175_985_677    | 70_984_270     | $0.0000943857 | $94.38            | <font color="red">+172_017</font>    |
| 17  | http_request_update | 175_300_910    | 70_710_364     | $0.0000940214 | $94.02            | <font color="green">-31_105</font>   |
| 18  | http_request_update | 174_815_115    | 70_516_046     | $0.0000937631 | $93.76            | <font color="green">-50_598</font>   |
| 19  | http_request_update | 175_714_660    | 70_875_864     | $0.0000942415 | $94.24            | <font color="red">+63_450</font>     |
| 20  | http_request_update | 173_530_034    | 70_002_013     | $0.0000930796 | $93.07            | <font color="green">-29_601</font>   |
| 21  | http_request_update | 173_661_011    | 70_054_404     | $0.0000931492 | $93.14            | <font color="red">+156_939</font>    |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 16_059_040_758 | 12_824_206_303 | $0.0170519624 | $17_051.96        |
| 1   | http_request_update | 175_054_772    | 70_611_908     | $0.0000938905 | $93.89            |
| 2   | http_request_update | 174_885_267    | 70_544_106     | $0.0000938004 | $93.80            |
| 3   | http_request_update | 175_747_911    | 70_889_164     | $0.0000942592 | $94.25            |
| 4   | http_request_update | 174_819_968    | 70_517_987     | $0.0000937657 | $93.76            |
| 5   | http_request_update | 174_923_777    | 70_559_510     | $0.0000938209 | $93.82            |
| 6   | http_request_update | 175_677_268    | 70_860_907     | $0.0000942216 | $94.22            |
| 7   | http_request_update | 174_927_540    | 70_561_016     | $0.0000938229 | $93.82            |
| 8   | http_request_update | 177_629_005    | 71_641_602     | $0.0000952597 | $95.25            |
| 9   | http_request_update | 173_629_172    | 70_041_668     | $0.0000931323 | $93.13            |
| 10  | http_request_update | 175_331_541    | 70_722_616     | $0.0000940377 | $94.03            |
| 11  | http_request_update | 182_650_766    | 73_650_306     | $0.0000979306 | $97.93            |
| 12  | http_request_update | 175_394_471    | 70_747_788     | $0.0000940712 | $94.07            |
| 13  | http_request_update | 174_915_081    | 70_556_032     | $0.0000938162 | $93.81            |
| 14  | http_request_update | 175_679_289    | 70_861_715     | $0.0000942227 | $94.22            |
| 15  | http_request_update | 173_422_995    | 69_959_198     | $0.0000930226 | $93.02            |
| 16  | http_request_update | 175_813_660    | 70_915_464     | $0.0000942942 | $94.29            |
| 17  | http_request_update | 175_332_015    | 70_722_806     | $0.0000940380 | $94.03            |
| 18  | http_request_update | 174_865_713    | 70_536_285     | $0.0000937900 | $93.78            |
| 19  | http_request_update | 175_651_210    | 70_850_484     | $0.0000942078 | $94.20            |
| 20  | http_request_update | 173_559_635    | 70_013_854     | $0.0000930953 | $93.09            |
| 21  | http_request_update | 173_504_072    | 69_991_628     | $0.0000930658 | $93.06            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
