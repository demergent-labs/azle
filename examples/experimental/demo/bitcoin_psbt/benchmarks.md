# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 9_259_520_716 | 7_304_398_286 | $0.0097124393 | $9_712.43         | <font color="green">-6_809_862_808</font> |
| 1   | http_request_update | 172_927_304   | 69_760_921    | $0.0000927590 | $92.75            | <font color="green">-1_930_504</font>     |
| 2   | http_request_update | 173_017_133   | 69_796_853    | $0.0000928068 | $92.80            | <font color="green">-1_928_762</font>     |
| 3   | http_request_update | 173_627_523   | 70_041_009    | $0.0000931314 | $93.13            | <font color="green">-2_229_510</font>     |
| 4   | http_request_update | 173_000_972   | 69_790_388    | $0.0000927982 | $92.79            | <font color="green">-2_045_920</font>     |
| 5   | http_request_update | 172_949_358   | 69_769_743    | $0.0000927707 | $92.77            | <font color="green">-1_881_556</font>     |
| 6   | http_request_update | 173_861_712   | 70_134_684    | $0.0000932560 | $93.25            | <font color="green">-1_797_420</font>     |
| 7   | http_request_update | 172_924_896   | 69_759_958    | $0.0000927577 | $92.75            | <font color="green">-2_074_651</font>     |
| 8   | http_request_update | 175_767_798   | 70_897_119    | $0.0000942698 | $94.26            | <font color="green">-2_013_789</font>     |
| 9   | http_request_update | 171_722_912   | 69_279_164    | $0.0000921184 | $92.11            | <font color="green">-1_894_824</font>     |
| 10  | http_request_update | 173_448_251   | 69_969_300    | $0.0000930361 | $93.03            | <font color="green">-2_004_229</font>     |
| 11  | http_request_update | 180_377_476   | 72_740_990    | $0.0000967215 | $96.72            | <font color="green">-2_356_886</font>     |
| 12  | http_request_update | 173_717_414   | 70_076_965    | $0.0000931792 | $93.17            | <font color="green">-1_525_658</font>     |
| 13  | http_request_update | 173_049_900   | 69_809_960    | $0.0000928242 | $92.82            | <font color="green">-1_789_178</font>     |
| 14  | http_request_update | 174_091_650   | 70_226_660    | $0.0000933783 | $93.37            | <font color="green">-1_705_158</font>     |
| 15  | http_request_update | 171_896_800   | 69_348_720    | $0.0000922109 | $92.21            | <font color="green">-1_774_250</font>     |
| 16  | http_request_update | 174_035_258   | 70_204_103    | $0.0000933483 | $93.34            | <font color="green">-1_950_419</font>     |
| 17  | http_request_update | 173_355_657   | 69_932_262    | $0.0000929868 | $92.98            | <font color="green">-1_945_253</font>     |
| 18  | http_request_update | 173_005_922   | 69_792_368    | $0.0000928008 | $92.80            | <font color="green">-1_809_193</font>     |
| 19  | http_request_update | 173_860_341   | 70_134_136    | $0.0000932553 | $93.25            | <font color="green">-1_854_319</font>     |
| 20  | http_request_update | 171_763_407   | 69_295_362    | $0.0000921400 | $92.13            | <font color="green">-1_766_627</font>     |
| 21  | http_request_update | 171_818_430   | 69_317_372    | $0.0000921692 | $92.16            | <font color="green">-1_842_581</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 16_069_383_524 | 12_828_343_409 | $0.0170574634 | $17_057.46        |
| 1   | http_request_update | 174_857_808    | 70_533_123     | $0.0000937858 | $93.78            |
| 2   | http_request_update | 174_945_895    | 70_568_358     | $0.0000938326 | $93.83            |
| 3   | http_request_update | 175_857_033    | 70_932_813     | $0.0000943172 | $94.31            |
| 4   | http_request_update | 175_046_892    | 70_608_756     | $0.0000938863 | $93.88            |
| 5   | http_request_update | 174_830_914    | 70_522_365     | $0.0000937715 | $93.77            |
| 6   | http_request_update | 175_659_132    | 70_853_652     | $0.0000942120 | $94.21            |
| 7   | http_request_update | 174_999_547    | 70_589_818     | $0.0000938612 | $93.86            |
| 8   | http_request_update | 177_781_587    | 71_702_634     | $0.0000953408 | $95.34            |
| 9   | http_request_update | 173_617_736    | 70_037_094     | $0.0000931262 | $93.12            |
| 10  | http_request_update | 175_452_480    | 70_770_992     | $0.0000941021 | $94.10            |
| 11  | http_request_update | 182_734_362    | 73_683_744     | $0.0000979751 | $97.97            |
| 12  | http_request_update | 175_243_072    | 70_687_228     | $0.0000939907 | $93.99            |
| 13  | http_request_update | 174_839_078    | 70_525_631     | $0.0000937758 | $93.77            |
| 14  | http_request_update | 175_796_808    | 70_908_723     | $0.0000942852 | $94.28            |
| 15  | http_request_update | 173_671_050    | 70_058_420     | $0.0000931546 | $93.15            |
| 16  | http_request_update | 175_985_677    | 70_984_270     | $0.0000943857 | $94.38            |
| 17  | http_request_update | 175_300_910    | 70_710_364     | $0.0000940214 | $94.02            |
| 18  | http_request_update | 174_815_115    | 70_516_046     | $0.0000937631 | $93.76            |
| 19  | http_request_update | 175_714_660    | 70_875_864     | $0.0000942415 | $94.24            |
| 20  | http_request_update | 173_530_034    | 70_002_013     | $0.0000930796 | $93.07            |
| 21  | http_request_update | 173_661_011    | 70_054_404     | $0.0000931492 | $93.14            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
