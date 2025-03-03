# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | manualUpdate   | 677_590      | 861_036   | $0.0000011449 | $1.14             | <font color="green">-953</font>    |
| 1   | manualUpdate   | 1_583_129    | 1_223_251 | $0.0000016265 | $1.62             | <font color="green">-7_055</font>  |
| 2   | updateBlob     | 1_451_879    | 1_170_751 | $0.0000015567 | $1.55             | <font color="green">-4_760</font>  |
| 3   | updateFloat32  | 999_783      | 989_913   | $0.0000013163 | $1.31             | <font color="green">-6_484</font>  |
| 4   | updateInt8     | 1_092_985    | 1_027_194 | $0.0000013658 | $1.36             | <font color="green">-7_021</font>  |
| 5   | updateNat      | 1_486_216    | 1_184_486 | $0.0000015750 | $1.57             | <font color="green">-13_112</font> |
| 6   | updateNull     | 986_318      | 984_527   | $0.0000013091 | $1.30             | <font color="green">-6_045</font>  |
| 7   | updateVoid     | 843_475      | 927_390   | $0.0000012331 | $1.23             | <font color="green">-5_145</font>  |
| 8   | updateRecord   | 16_531_050   | 7_202_420 | $0.0000095768 | $9.57             | <font color="red">+37_255</font>   |
| 9   | updateReserved | 984_599      | 983_839   | $0.0000013082 | $1.30             | <font color="green">-7_284</font>  |
| 10  | updateString   | 1_241_669    | 1_086_667 | $0.0000014449 | $1.44             | <font color="green">-6_226</font>  |
| 11  | updateVariant  | 4_293_953    | 2_307_581 | $0.0000030683 | $3.06             | <font color="green">-15_513</font> |
| 12  | updateFloat32  | 997_231      | 988_892   | $0.0000013149 | $1.31             | <font color="green">-7_398</font>  |
| 13  | replyRaw       | 459_505      | 773_802   | $0.0000010289 | $1.02             | <font color="green">-684</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 678_543      | 861_417   | $0.0000011454 | $1.14             |
| 1   | manualUpdate   | 1_590_184    | 1_226_073 | $0.0000016303 | $1.63             |
| 2   | updateBlob     | 1_456_639    | 1_172_655 | $0.0000015592 | $1.55             |
| 3   | updateFloat32  | 1_006_267    | 992_506   | $0.0000013197 | $1.31             |
| 4   | updateInt8     | 1_100_006    | 1_030_002 | $0.0000013696 | $1.36             |
| 5   | updateNat      | 1_499_328    | 1_189_731 | $0.0000015819 | $1.58             |
| 6   | updateNull     | 992_363      | 986_945   | $0.0000013123 | $1.31             |
| 7   | updateVoid     | 848_620      | 929_448   | $0.0000012359 | $1.23             |
| 8   | updateRecord   | 16_493_795   | 7_187_518 | $0.0000095570 | $9.55             |
| 9   | updateReserved | 991_883      | 986_753   | $0.0000013121 | $1.31             |
| 10  | updateString   | 1_247_895    | 1_089_158 | $0.0000014482 | $1.44             |
| 11  | updateVariant  | 4_309_466    | 2_313_786 | $0.0000030766 | $3.07             |
| 12  | updateFloat32  | 1_004_629    | 991_851   | $0.0000013188 | $1.31             |
| 13  | replyRaw       | 460_189      | 774_075   | $0.0000010293 | $1.02             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
