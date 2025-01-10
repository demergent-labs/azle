# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | manualUpdate   | 764_185      | 895_674   | $0.0000011910 | $1.19             | <font color="red">+35_877</font>  |
| 1   | manualUpdate   | 1_730_084    | 1_282_033 | $0.0000017047 | $1.70             | <font color="red">+99_232</font>  |
| 2   | updateBlob     | 1_599_981    | 1_229_992 | $0.0000016355 | $1.63             | <font color="red">+92_276</font>  |
| 3   | updateFloat32  | 1_121_665    | 1_038_666 | $0.0000013811 | $1.38             | <font color="red">+60_489</font>  |
| 4   | updateInt8     | 1_224_813    | 1_079_925 | $0.0000014359 | $1.43             | <font color="red">+64_358</font>  |
| 5   | updateNat      | 1_643_214    | 1_247_285 | $0.0000016585 | $1.65             | <font color="red">+91_361</font>  |
| 6   | updateNull     | 1_109_520    | 1_033_808 | $0.0000013746 | $1.37             | <font color="red">+63_356</font>  |
| 7   | updateVoid     | 953_307      | 971_322   | $0.0000012915 | $1.29             | <font color="red">+52_453</font>  |
| 8   | updateRecord   | 13_931_647   | 6_162_658 | $0.0000081943 | $8.19             | <font color="red">+926_640</font> |
| 9   | updateReserved | 1_107_389    | 1_032_955 | $0.0000013735 | $1.37             | <font color="red">+61_277</font>  |
| 10  | updateString   | 1_381_297    | 1_142_518 | $0.0000015192 | $1.51             | <font color="red">+80_983</font>  |
| 11  | updateVariant  | 3_700_237    | 2_070_094 | $0.0000027525 | $2.75             | <font color="red">+240_001</font> |
| 12  | updateFloat32  | 1_119_282    | 1_037_712 | $0.0000013798 | $1.37             | <font color="red">+62_035</font>  |
| 13  | replyRaw       | 537_299      | 804_919   | $0.0000010703 | $1.07             | <font color="red">+8_973</font>   |

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
