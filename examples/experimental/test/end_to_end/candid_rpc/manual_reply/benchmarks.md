# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | manualUpdate   | 679_100      | 861_640   | $0.0000011457 | $1.14             | <font color="red">+1_510</font>    |
| 1   | manualUpdate   | 1_589_664    | 1_225_865 | $0.0000016300 | $1.62             | <font color="red">+6_535</font>    |
| 2   | updateBlob     | 1_457_156    | 1_172_862 | $0.0000015595 | $1.55             | <font color="red">+5_277</font>    |
| 3   | updateFloat32  | 1_004_155    | 991_662   | $0.0000013186 | $1.31             | <font color="red">+4_372</font>    |
| 4   | updateInt8     | 1_099_122    | 1_029_648 | $0.0000013691 | $1.36             | <font color="red">+6_137</font>    |
| 5   | updateNat      | 1_505_477    | 1_192_190 | $0.0000015852 | $1.58             | <font color="red">+19_261</font>   |
| 6   | updateNull     | 993_635      | 987_454   | $0.0000013130 | $1.31             | <font color="red">+7_317</font>    |
| 7   | updateVoid     | 848_959      | 929_583   | $0.0000012360 | $1.23             | <font color="red">+5_484</font>    |
| 8   | updateRecord   | 16_515_171   | 7_196_068 | $0.0000095684 | $9.56             | <font color="green">-15_879</font> |
| 9   | updateReserved | 992_086      | 986_834   | $0.0000013122 | $1.31             | <font color="red">+7_487</font>    |
| 10  | updateString   | 1_249_549    | 1_089_819 | $0.0000014491 | $1.44             | <font color="red">+7_880</font>    |
| 11  | updateVariant  | 4_308_564    | 2_313_425 | $0.0000030761 | $3.07             | <font color="red">+14_611</font>   |
| 12  | updateFloat32  | 1_003_794    | 991_517   | $0.0000013184 | $1.31             | <font color="red">+6_563</font>    |
| 13  | replyRaw       | 460_615      | 774_246   | $0.0000010295 | $1.02             | <font color="red">+1_110</font>    |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 677_590      | 861_036   | $0.0000011449 | $1.14             |
| 1   | manualUpdate   | 1_583_129    | 1_223_251 | $0.0000016265 | $1.62             |
| 2   | updateBlob     | 1_451_879    | 1_170_751 | $0.0000015567 | $1.55             |
| 3   | updateFloat32  | 999_783      | 989_913   | $0.0000013163 | $1.31             |
| 4   | updateInt8     | 1_092_985    | 1_027_194 | $0.0000013658 | $1.36             |
| 5   | updateNat      | 1_486_216    | 1_184_486 | $0.0000015750 | $1.57             |
| 6   | updateNull     | 986_318      | 984_527   | $0.0000013091 | $1.30             |
| 7   | updateVoid     | 843_475      | 927_390   | $0.0000012331 | $1.23             |
| 8   | updateRecord   | 16_531_050   | 7_202_420 | $0.0000095768 | $9.57             |
| 9   | updateReserved | 984_599      | 983_839   | $0.0000013082 | $1.30             |
| 10  | updateString   | 1_241_669    | 1_086_667 | $0.0000014449 | $1.44             |
| 11  | updateVariant  | 4_293_953    | 2_307_581 | $0.0000030683 | $3.06             |
| 12  | updateFloat32  | 997_231      | 988_892   | $0.0000013149 | $1.31             |
| 13  | replyRaw       | 459_505      | 773_802   | $0.0000010289 | $1.02             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
