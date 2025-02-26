# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 16_056_058_964 | 12_823_013_585 | $0.0170503765 | $17_050.37        | <font color="green">-6_924_719</font> |
| 1   | http_request_update | 173_824_950    | 70_119_980     | $0.0000932364 | $93.23            | <font color="green">-2_089_811</font> |
| 2   | http_request_update | 173_822_775    | 70_119_110     | $0.0000932353 | $93.23            | <font color="green">-2_017_372</font> |
| 3   | http_request_update | 174_755_166    | 70_492_066     | $0.0000937312 | $93.73            | <font color="green">-1_906_711</font> |
| 4   | http_request_update | 173_789_879    | 70_105_951     | $0.0000932178 | $93.21            | <font color="green">-2_050_369</font> |
| 5   | http_request_update | 173_691_277    | 70_066_510     | $0.0000931653 | $93.16            | <font color="green">-2_085_850</font> |
| 6   | http_request_update | 174_606_685    | 70_432_674     | $0.0000936522 | $93.65            | <font color="green">-1_981_519</font> |
| 7   | http_request_update | 173_830_043    | 70_122_017     | $0.0000932391 | $93.23            | <font color="green">-2_016_819</font> |
| 8   | http_request_update | 176_679_967    | 71_261_986     | $0.0000947549 | $94.75            | <font color="green">-1_798_727</font> |
| 9   | http_request_update | 172_445_839    | 69_568_335     | $0.0000925029 | $92.50            | <font color="green">-2_037_212</font> |
| 10  | http_request_update | 174_191_091    | 70_266_436     | $0.0000934312 | $93.43            | <font color="green">-2_247_473</font> |
| 11  | http_request_update | 181_686_675    | 73_264_670     | $0.0000974178 | $97.41            | <font color="green">-1_925_974</font> |
| 12  | http_request_update | 174_186_675    | 70_264_670     | $0.0000934288 | $93.42            | <font color="green">-1_985_590</font> |
| 13  | http_request_update | 173_744_900    | 70_087_960     | $0.0000931939 | $93.19            | <font color="green">-2_094_015</font> |
| 14  | http_request_update | 174_548_702    | 70_409_480     | $0.0000936214 | $93.62            | <font color="green">-2_037_427</font> |
| 15  | http_request_update | 172_536_081    | 69_604_432     | $0.0000925509 | $92.55            | <font color="green">-1_867_463</font> |
| 16  | http_request_update | 174_662_181    | 70_454_872     | $0.0000936817 | $93.68            | <font color="green">-2_090_413</font> |
| 17  | http_request_update | 174_209_778    | 70_273_911     | $0.0000934411 | $93.44            | <font color="green">-2_055_641</font> |
| 18  | http_request_update | 173_746_878    | 70_088_751     | $0.0000931949 | $93.19            | <font color="green">-1_967_719</font> |
| 19  | http_request_update | 174_861_027    | 70_534_410     | $0.0000937875 | $93.78            | <font color="green">-1_692_466</font> |
| 20  | http_request_update | 172_511_512    | 69_594_604     | $0.0000925379 | $92.53            | <font color="green">-1_939_872</font> |
| 21  | http_request_update | 172_426_877    | 69_560_750     | $0.0000924928 | $92.49            | <font color="green">-1_863_695</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 16_062_983_683 | 12_825_783_473 | $0.0170540595 | $17_054.05        |
| 1   | http_request_update | 175_914_761    | 70_955_904     | $0.0000943479 | $94.34            |
| 2   | http_request_update | 175_840_147    | 70_926_058     | $0.0000943083 | $94.30            |
| 3   | http_request_update | 176_661_877    | 71_254_750     | $0.0000947453 | $94.74            |
| 4   | http_request_update | 175_840_248    | 70_926_099     | $0.0000943083 | $94.30            |
| 5   | http_request_update | 175_777_127    | 70_900_850     | $0.0000942747 | $94.27            |
| 6   | http_request_update | 176_588_204    | 71_225_281     | $0.0000947061 | $94.70            |
| 7   | http_request_update | 175_846_862    | 70_928_744     | $0.0000943118 | $94.31            |
| 8   | http_request_update | 178_478_694    | 71_981_477     | $0.0000957116 | $95.71            |
| 9   | http_request_update | 174_483_051    | 70_383_220     | $0.0000935865 | $93.58            |
| 10  | http_request_update | 176_438_564    | 71_165_425     | $0.0000946265 | $94.62            |
| 11  | http_request_update | 183_612_649    | 74_035_059     | $0.0000984422 | $98.44            |
| 12  | http_request_update | 176_172_265    | 71_058_906     | $0.0000944849 | $94.48            |
| 13  | http_request_update | 175_838_915    | 70_925_566     | $0.0000943076 | $94.30            |
| 14  | http_request_update | 176_586_129    | 71_224_451     | $0.0000947050 | $94.70            |
| 15  | http_request_update | 174_403_544    | 70_351_417     | $0.0000935442 | $93.54            |
| 16  | http_request_update | 176_752_594    | 71_291_037     | $0.0000947936 | $94.79            |
| 17  | http_request_update | 176_265_419    | 71_096_167     | $0.0000945344 | $94.53            |
| 18  | http_request_update | 175_714_597    | 70_875_838     | $0.0000942415 | $94.24            |
| 19  | http_request_update | 176_553_493    | 71_211_397     | $0.0000946877 | $94.68            |
| 20  | http_request_update | 174_451_384    | 70_370_553     | $0.0000935696 | $93.56            |
| 21  | http_request_update | 174_290_572    | 70_306_228     | $0.0000934841 | $93.48            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
