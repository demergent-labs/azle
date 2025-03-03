# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 16_056_362_188 | 12_823_134_875 | $0.0170505377 | $17_050.53        | <font color="red">+303_224</font>   |
| 1   | http_request_update | 174_918_718    | 70_557_487     | $0.0000938182 | $93.81            | <font color="red">+1_093_768</font> |
| 2   | http_request_update | 174_735_917    | 70_484_366     | $0.0000937209 | $93.72            | <font color="red">+913_142</font>   |
| 3   | http_request_update | 175_806_534    | 70_912_613     | $0.0000942904 | $94.29            | <font color="red">+1_051_368</font> |
| 4   | http_request_update | 175_009_227    | 70_593_690     | $0.0000938663 | $93.86            | <font color="red">+1_219_348</font> |
| 5   | http_request_update | 174_886_275    | 70_544_510     | $0.0000938009 | $93.80            | <font color="red">+1_194_998</font> |
| 6   | http_request_update | 175_726_985    | 70_880_794     | $0.0000942481 | $94.24            | <font color="red">+1_120_300</font> |
| 7   | http_request_update | 174_863_852    | 70_535_540     | $0.0000937890 | $93.78            | <font color="red">+1_033_809</font> |
| 8   | http_request_update | 177_644_777    | 71_647_910     | $0.0000952681 | $95.26            | <font color="red">+964_810</font>   |
| 9   | http_request_update | 173_475_447    | 69_980_178     | $0.0000930505 | $93.05            | <font color="red">+1_029_608</font> |
| 10  | http_request_update | 175_323_967    | 70_719_586     | $0.0000940337 | $94.03            | <font color="red">+1_132_876</font> |
| 11  | http_request_update | 182_733_908    | 73_683_563     | $0.0000979748 | $97.97            | <font color="red">+1_047_233</font> |
| 12  | http_request_update | 175_235_586    | 70_684_234     | $0.0000939867 | $93.98            | <font color="red">+1_048_911</font> |
| 13  | http_request_update | 174_939_240    | 70_565_696     | $0.0000938291 | $93.82            | <font color="red">+1_194_340</font> |
| 14  | http_request_update | 175_564_692    | 70_815_876     | $0.0000941617 | $94.16            | <font color="red">+1_015_990</font> |
| 15  | http_request_update | 173_463_311    | 69_975_324     | $0.0000930441 | $93.04            | <font color="red">+927_230</font>   |
| 16  | http_request_update | 175_871_529    | 70_938_611     | $0.0000943249 | $94.32            | <font color="red">+1_209_348</font> |
| 17  | http_request_update | 175_368_336    | 70_737_334     | $0.0000940573 | $94.05            | <font color="red">+1_158_558</font> |
| 18  | http_request_update | 174_985_971    | 70_584_388     | $0.0000938539 | $93.85            | <font color="red">+1_239_093</font> |
| 19  | http_request_update | 175_684_464    | 70_863_785     | $0.0000942254 | $94.22            | <font color="red">+823_437</font>   |
| 20  | http_request_update | 173_480_527    | 69_982_210     | $0.0000930532 | $93.05            | <font color="red">+969_015</font>   |
| 21  | http_request_update | 173_525_332    | 70_000_132     | $0.0000930771 | $93.07            | <font color="red">+1_098_455</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 16_056_058_964 | 12_823_013_585 | $0.0170503765 | $17_050.37        |
| 1   | http_request_update | 173_824_950    | 70_119_980     | $0.0000932364 | $93.23            |
| 2   | http_request_update | 173_822_775    | 70_119_110     | $0.0000932353 | $93.23            |
| 3   | http_request_update | 174_755_166    | 70_492_066     | $0.0000937312 | $93.73            |
| 4   | http_request_update | 173_789_879    | 70_105_951     | $0.0000932178 | $93.21            |
| 5   | http_request_update | 173_691_277    | 70_066_510     | $0.0000931653 | $93.16            |
| 6   | http_request_update | 174_606_685    | 70_432_674     | $0.0000936522 | $93.65            |
| 7   | http_request_update | 173_830_043    | 70_122_017     | $0.0000932391 | $93.23            |
| 8   | http_request_update | 176_679_967    | 71_261_986     | $0.0000947549 | $94.75            |
| 9   | http_request_update | 172_445_839    | 69_568_335     | $0.0000925029 | $92.50            |
| 10  | http_request_update | 174_191_091    | 70_266_436     | $0.0000934312 | $93.43            |
| 11  | http_request_update | 181_686_675    | 73_264_670     | $0.0000974178 | $97.41            |
| 12  | http_request_update | 174_186_675    | 70_264_670     | $0.0000934288 | $93.42            |
| 13  | http_request_update | 173_744_900    | 70_087_960     | $0.0000931939 | $93.19            |
| 14  | http_request_update | 174_548_702    | 70_409_480     | $0.0000936214 | $93.62            |
| 15  | http_request_update | 172_536_081    | 69_604_432     | $0.0000925509 | $92.55            |
| 16  | http_request_update | 174_662_181    | 70_454_872     | $0.0000936817 | $93.68            |
| 17  | http_request_update | 174_209_778    | 70_273_911     | $0.0000934411 | $93.44            |
| 18  | http_request_update | 173_746_878    | 70_088_751     | $0.0000931949 | $93.19            |
| 19  | http_request_update | 174_861_027    | 70_534_410     | $0.0000937875 | $93.78            |
| 20  | http_request_update | 172_511_512    | 69_594_604     | $0.0000925379 | $92.53            |
| 21  | http_request_update | 172_426_877    | 69_560_750     | $0.0000924928 | $92.49            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
