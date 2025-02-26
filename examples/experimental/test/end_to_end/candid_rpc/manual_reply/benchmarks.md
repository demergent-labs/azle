# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | manualUpdate   | 678_543      | 861_417   | $0.0000011454 | $1.14             | <font color="green">-3_563</font>   |
| 1   | manualUpdate   | 1_590_184    | 1_226_073 | $0.0000016303 | $1.63             | <font color="green">-5_110</font>   |
| 2   | updateBlob     | 1_456_639    | 1_172_655 | $0.0000015592 | $1.55             | <font color="green">-2_267</font>   |
| 3   | updateFloat32  | 1_006_267    | 992_506   | $0.0000013197 | $1.31             | <font color="green">-4_002</font>   |
| 4   | updateInt8     | 1_100_006    | 1_030_002 | $0.0000013696 | $1.36             | <font color="green">-4_290</font>   |
| 5   | updateNat      | 1_499_328    | 1_189_731 | $0.0000015819 | $1.58             | <font color="green">-8_027</font>   |
| 6   | updateNull     | 992_363      | 986_945   | $0.0000013123 | $1.31             | <font color="green">-5_049</font>   |
| 7   | updateVoid     | 848_620      | 929_448   | $0.0000012359 | $1.23             | <font color="green">-4_536</font>   |
| 8   | updateRecord   | 16_493_795   | 7_187_518 | $0.0000095570 | $9.55             | <font color="green">-102_405</font> |
| 9   | updateReserved | 991_883      | 986_753   | $0.0000013121 | $1.31             | <font color="green">-4_788</font>   |
| 10  | updateString   | 1_247_895    | 1_089_158 | $0.0000014482 | $1.44             | <font color="green">-4_313</font>   |
| 11  | updateVariant  | 4_309_466    | 2_313_786 | $0.0000030766 | $3.07             | <font color="green">-15_697</font>  |
| 12  | updateFloat32  | 1_004_629    | 991_851   | $0.0000013188 | $1.31             | <font color="green">-4_477</font>   |
| 13  | replyRaw       | 460_189      | 774_075   | $0.0000010293 | $1.02             | <font color="green">-3_369</font>   |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 682_106      | 862_842   | $0.0000011473 | $1.14             |
| 1   | manualUpdate   | 1_595_294    | 1_228_117 | $0.0000016330 | $1.63             |
| 2   | updateBlob     | 1_458_906    | 1_173_562 | $0.0000015605 | $1.56             |
| 3   | updateFloat32  | 1_010_269    | 994_107   | $0.0000013218 | $1.32             |
| 4   | updateInt8     | 1_104_296    | 1_031_718 | $0.0000013718 | $1.37             |
| 5   | updateNat      | 1_507_355    | 1_192_942 | $0.0000015862 | $1.58             |
| 6   | updateNull     | 997_412      | 988_964   | $0.0000013150 | $1.31             |
| 7   | updateVoid     | 853_156      | 931_262   | $0.0000012383 | $1.23             |
| 8   | updateRecord   | 16_596_200   | 7_228_480 | $0.0000096115 | $9.61             |
| 9   | updateReserved | 996_671      | 988_668   | $0.0000013146 | $1.31             |
| 10  | updateString   | 1_252_208    | 1_090_883 | $0.0000014505 | $1.45             |
| 11  | updateVariant  | 4_325_163    | 2_320_065 | $0.0000030849 | $3.08             |
| 12  | updateFloat32  | 1_009_106    | 993_642   | $0.0000013212 | $1.32             |
| 13  | replyRaw       | 463_558      | 775_423   | $0.0000010311 | $1.03             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
