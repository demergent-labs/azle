# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 760_315      | 894_126   | $0.0000011889 | $1.18             | <font color="red">+32_007</font>  |
| 1   | manualUpdate   | 1_730_297    | 1_282_118 | $0.0000017048 | $1.70             | <font color="red">+99_445</font>  |
| 2   | updateBlob     | 1_596_829    | 1_228_731 | $0.0000016338 | $1.63             | <font color="red">+89_124</font>  |
| 3   | updateFloat32  | 1_122_967    | 1_039_186 | $0.0000013818 | $1.38             | <font color="red">+61_791</font>  |
| 4   | updateInt8     | 1_228_381    | 1_081_352 | $0.0000014378 | $1.43             | <font color="red">+67_926</font>  |
| 5   | updateNat      | 1_642_786    | 1_247_114 | $0.0000016583 | $1.65             | <font color="red">+90_933</font>  |
| 6   | updateNull     | 1_109_305    | 1_033_722 | $0.0000013745 | $1.37             | <font color="red">+63_141</font>  |
| 7   | updateVoid     | 954_744      | 971_897   | $0.0000012923 | $1.29             | <font color="red">+53_890</font>  |
| 8   | updateRecord   | 13_931_702   | 6_162_680 | $0.0000081943 | $8.19             | <font color="red">+926_695</font> |
| 9   | updateReserved | 1_106_454    | 1_032_581 | $0.0000013730 | $1.37             | <font color="red">+60_342</font>  |
| 10  | updateString   | 1_383_581    | 1_143_432 | $0.0000015204 | $1.52             | <font color="red">+83_267</font>  |
| 11  | updateVariant  | 3_705_682    | 2_072_272 | $0.0000027554 | $2.75             | <font color="red">+245_446</font> |
| 12  | updateFloat32  | 1_120_333    | 1_038_133 | $0.0000013804 | $1.38             | <font color="red">+63_086</font>  |
| 13  | replyRaw       | 538_093      | 805_237   | $0.0000010707 | $1.07             | <font color="red">+9_767</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 728_308      | 881_323   | $0.0000011719 | $1.17             |
| 1   | manualUpdate   | 1_630_852    | 1_242_340 | $0.0000016519 | $1.65             |
| 2   | updateBlob     | 1_507_705    | 1_193_082 | $0.0000015864 | $1.58             |
| 3   | updateFloat32  | 1_061_176    | 1_014_470 | $0.0000013489 | $1.34             |
| 4   | updateInt8     | 1_160_455    | 1_054_182 | $0.0000014017 | $1.40             |
| 5   | updateNat      | 1_551_853    | 1_210_741 | $0.0000016099 | $1.60             |
| 6   | updateNull     | 1_046_164    | 1_008_465 | $0.0000013409 | $1.34             |
| 7   | updateVoid     | 900_854      | 950_341   | $0.0000012636 | $1.26             |
| 8   | updateRecord   | 13_005_007   | 5_792_002 | $0.0000077015 | $7.70             |
| 9   | updateReserved | 1_046_112    | 1_008_444 | $0.0000013409 | $1.34             |
| 10  | updateString   | 1_300_314    | 1_110_125 | $0.0000014761 | $1.47             |
| 11  | updateVariant  | 3_460_236    | 1_974_094 | $0.0000026249 | $2.62             |
| 12  | updateFloat32  | 1_057_247    | 1_012_898 | $0.0000013468 | $1.34             |
| 13  | replyRaw       | 528_326      | 801_330   | $0.0000010655 | $1.06             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
