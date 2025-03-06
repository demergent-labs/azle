# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | manualUpdate   | 677_444      | 860_977   | $0.0000011448 | $1.14             | <font color="green">-1_099</font>  |
| 1   | manualUpdate   | 1_583_680    | 1_223_472 | $0.0000016268 | $1.62             | <font color="green">-6_504</font>  |
| 2   | updateBlob     | 1_448_059    | 1_169_223 | $0.0000015547 | $1.55             | <font color="green">-8_580</font>  |
| 3   | updateFloat32  | 999_822      | 989_928   | $0.0000013163 | $1.31             | <font color="green">-6_445</font>  |
| 4   | updateInt8     | 1_092_806    | 1_027_122 | $0.0000013657 | $1.36             | <font color="green">-7_200</font>  |
| 5   | updateNat      | 1_485_333    | 1_184_133 | $0.0000015745 | $1.57             | <font color="green">-13_995</font> |
| 6   | updateNull     | 986_305      | 984_522   | $0.0000013091 | $1.30             | <font color="green">-6_058</font>  |
| 7   | updateVoid     | 843_930      | 927_572   | $0.0000012334 | $1.23             | <font color="green">-4_690</font>  |
| 8   | updateRecord   | 16_537_869   | 7_205_147 | $0.0000095805 | $9.58             | <font color="red">+44_074</font>   |
| 9   | updateReserved | 985_598      | 984_239   | $0.0000013087 | $1.30             | <font color="green">-6_285</font>  |
| 10  | updateString   | 1_241_763    | 1_086_705 | $0.0000014450 | $1.44             | <font color="green">-6_132</font>  |
| 11  | updateVariant  | 4_295_328    | 2_308_131 | $0.0000030691 | $3.06             | <font color="green">-14_138</font> |
| 12  | updateFloat32  | 997_668      | 989_067   | $0.0000013151 | $1.31             | <font color="green">-6_961</font>  |
| 13  | replyRaw       | 459_519      | 773_807   | $0.0000010289 | $1.02             | <font color="green">-670</font>    |

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
