# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 16_059_040_758 | 12_824_206_303 | $0.0170519624 | $17_051.96        | <font color="red">+2_678_570</font> |
| 1   | http_request_update | 175_054_772    | 70_611_908     | $0.0000938905 | $93.89            | <font color="red">+136_054</font>   |
| 2   | http_request_update | 174_885_267    | 70_544_106     | $0.0000938004 | $93.80            | <font color="red">+149_350</font>   |
| 3   | http_request_update | 175_747_911    | 70_889_164     | $0.0000942592 | $94.25            | <font color="green">-58_623</font>  |
| 4   | http_request_update | 174_819_968    | 70_517_987     | $0.0000937657 | $93.76            | <font color="green">-189_259</font> |
| 5   | http_request_update | 174_923_777    | 70_559_510     | $0.0000938209 | $93.82            | <font color="red">+37_502</font>    |
| 6   | http_request_update | 175_677_268    | 70_860_907     | $0.0000942216 | $94.22            | <font color="green">-49_717</font>  |
| 7   | http_request_update | 174_927_540    | 70_561_016     | $0.0000938229 | $93.82            | <font color="red">+63_688</font>    |
| 8   | http_request_update | 177_629_005    | 71_641_602     | $0.0000952597 | $95.25            | <font color="green">-15_772</font>  |
| 9   | http_request_update | 173_629_172    | 70_041_668     | $0.0000931323 | $93.13            | <font color="red">+153_725</font>   |
| 10  | http_request_update | 175_331_541    | 70_722_616     | $0.0000940377 | $94.03            | <font color="red">+7_574</font>     |
| 11  | http_request_update | 182_650_766    | 73_650_306     | $0.0000979306 | $97.93            | <font color="green">-83_142</font>  |
| 12  | http_request_update | 175_394_471    | 70_747_788     | $0.0000940712 | $94.07            | <font color="red">+158_885</font>   |
| 13  | http_request_update | 174_915_081    | 70_556_032     | $0.0000938162 | $93.81            | <font color="green">-24_159</font>  |
| 14  | http_request_update | 175_679_289    | 70_861_715     | $0.0000942227 | $94.22            | <font color="red">+114_597</font>   |
| 15  | http_request_update | 173_422_995    | 69_959_198     | $0.0000930226 | $93.02            | <font color="green">-40_316</font>  |
| 16  | http_request_update | 175_813_660    | 70_915_464     | $0.0000942942 | $94.29            | <font color="green">-57_869</font>  |
| 17  | http_request_update | 175_332_015    | 70_722_806     | $0.0000940380 | $94.03            | <font color="green">-36_321</font>  |
| 18  | http_request_update | 174_865_713    | 70_536_285     | $0.0000937900 | $93.78            | <font color="green">-120_258</font> |
| 19  | http_request_update | 175_651_210    | 70_850_484     | $0.0000942078 | $94.20            | <font color="green">-33_254</font>  |
| 20  | http_request_update | 173_559_635    | 70_013_854     | $0.0000930953 | $93.09            | <font color="red">+79_108</font>    |
| 21  | http_request_update | 173_504_072    | 69_991_628     | $0.0000930658 | $93.06            | <font color="green">-21_260</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 16_056_362_188 | 12_823_134_875 | $0.0170505377 | $17_050.53        |
| 1   | http_request_update | 174_918_718    | 70_557_487     | $0.0000938182 | $93.81            |
| 2   | http_request_update | 174_735_917    | 70_484_366     | $0.0000937209 | $93.72            |
| 3   | http_request_update | 175_806_534    | 70_912_613     | $0.0000942904 | $94.29            |
| 4   | http_request_update | 175_009_227    | 70_593_690     | $0.0000938663 | $93.86            |
| 5   | http_request_update | 174_886_275    | 70_544_510     | $0.0000938009 | $93.80            |
| 6   | http_request_update | 175_726_985    | 70_880_794     | $0.0000942481 | $94.24            |
| 7   | http_request_update | 174_863_852    | 70_535_540     | $0.0000937890 | $93.78            |
| 8   | http_request_update | 177_644_777    | 71_647_910     | $0.0000952681 | $95.26            |
| 9   | http_request_update | 173_475_447    | 69_980_178     | $0.0000930505 | $93.05            |
| 10  | http_request_update | 175_323_967    | 70_719_586     | $0.0000940337 | $94.03            |
| 11  | http_request_update | 182_733_908    | 73_683_563     | $0.0000979748 | $97.97            |
| 12  | http_request_update | 175_235_586    | 70_684_234     | $0.0000939867 | $93.98            |
| 13  | http_request_update | 174_939_240    | 70_565_696     | $0.0000938291 | $93.82            |
| 14  | http_request_update | 175_564_692    | 70_815_876     | $0.0000941617 | $94.16            |
| 15  | http_request_update | 173_463_311    | 69_975_324     | $0.0000930441 | $93.04            |
| 16  | http_request_update | 175_871_529    | 70_938_611     | $0.0000943249 | $94.32            |
| 17  | http_request_update | 175_368_336    | 70_737_334     | $0.0000940573 | $94.05            |
| 18  | http_request_update | 174_985_971    | 70_584_388     | $0.0000938539 | $93.85            |
| 19  | http_request_update | 175_684_464    | 70_863_785     | $0.0000942254 | $94.22            |
| 20  | http_request_update | 173_480_527    | 69_982_210     | $0.0000930532 | $93.05            |
| 21  | http_request_update | 173_525_332    | 70_000_132     | $0.0000930771 | $93.07            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
