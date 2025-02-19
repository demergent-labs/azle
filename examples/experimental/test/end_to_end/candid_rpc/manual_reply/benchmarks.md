# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | manualUpdate   | 682_106      | 862_842   | $0.0000011473 | $1.14             | <font color="red">+9_528</font>     |
| 1   | manualUpdate   | 1_595_294    | 1_228_117 | $0.0000016330 | $1.63             | <font color="green">-20_691</font>  |
| 2   | updateBlob     | 1_458_906    | 1_173_562 | $0.0000015605 | $1.56             | <font color="green">-24_964</font>  |
| 3   | updateFloat32  | 1_010_269    | 994_107   | $0.0000013218 | $1.32             | <font color="green">-19_297</font>  |
| 4   | updateInt8     | 1_104_296    | 1_031_718 | $0.0000013718 | $1.37             | <font color="green">-24_722</font>  |
| 5   | updateNat      | 1_507_355    | 1_192_942 | $0.0000015862 | $1.58             | <font color="green">-19_783</font>  |
| 6   | updateNull     | 997_412      | 988_964   | $0.0000013150 | $1.31             | <font color="green">-23_923</font>  |
| 7   | updateVoid     | 853_156      | 931_262   | $0.0000012383 | $1.23             | <font color="green">-2_065</font>   |
| 8   | updateRecord   | 16_596_200   | 7_228_480 | $0.0000096115 | $9.61             | <font color="green">-258_351</font> |
| 9   | updateReserved | 996_671      | 988_668   | $0.0000013146 | $1.31             | <font color="green">-23_658</font>  |
| 10  | updateString   | 1_252_208    | 1_090_883 | $0.0000014505 | $1.45             | <font color="green">-24_083</font>  |
| 11  | updateVariant  | 4_325_163    | 2_320_065 | $0.0000030849 | $3.08             | <font color="green">-57_800</font>  |
| 12  | updateFloat32  | 1_009_106    | 993_642   | $0.0000013212 | $1.32             | <font color="green">-21_971</font>  |
| 13  | replyRaw       | 463_558      | 775_423   | $0.0000010311 | $1.03             | <font color="red">+7_288</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 672_578      | 859_031   | $0.0000011422 | $1.14             |
| 1   | manualUpdate   | 1_615_985    | 1_236_394 | $0.0000016440 | $1.64             |
| 2   | updateBlob     | 1_483_870    | 1_183_548 | $0.0000015737 | $1.57             |
| 3   | updateFloat32  | 1_029_566    | 1_001_826 | $0.0000013321 | $1.33             |
| 4   | updateInt8     | 1_129_018    | 1_041_607 | $0.0000013850 | $1.38             |
| 5   | updateNat      | 1_527_138    | 1_200_855 | $0.0000015967 | $1.59             |
| 6   | updateNull     | 1_021_335    | 998_534   | $0.0000013277 | $1.32             |
| 7   | updateVoid     | 855_221      | 932_088   | $0.0000012394 | $1.23             |
| 8   | updateRecord   | 16_854_551   | 7_331_820 | $0.0000097489 | $9.74             |
| 9   | updateReserved | 1_020_329    | 998_131   | $0.0000013272 | $1.32             |
| 10  | updateString   | 1_276_291    | 1_100_516 | $0.0000014633 | $1.46             |
| 11  | updateVariant  | 4_382_963    | 2_343_185 | $0.0000031157 | $3.11             |
| 12  | updateFloat32  | 1_031_077    | 1_002_430 | $0.0000013329 | $1.33             |
| 13  | replyRaw       | 456_270      | 772_508   | $0.0000010272 | $1.02             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
