# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | manualUpdate   | 672_578      | 859_031   | $0.0000011422 | $1.14             | <font color="red">+3_773</font>    |
| 1   | manualUpdate   | 1_615_985    | 1_236_394 | $0.0000016440 | $1.64             | <font color="red">+1_448</font>    |
| 2   | updateBlob     | 1_483_870    | 1_183_548 | $0.0000015737 | $1.57             | <font color="green">-1_726</font>  |
| 3   | updateFloat32  | 1_029_566    | 1_001_826 | $0.0000013321 | $1.33             | <font color="green">-1_394</font>  |
| 4   | updateInt8     | 1_129_018    | 1_041_607 | $0.0000013850 | $1.38             | <font color="red">+3_239</font>    |
| 5   | updateNat      | 1_527_138    | 1_200_855 | $0.0000015967 | $1.59             | <font color="red">+1_474</font>    |
| 6   | updateNull     | 1_021_335    | 998_534   | $0.0000013277 | $1.32             | <font color="red">+4_825</font>    |
| 7   | updateVoid     | 855_221      | 932_088   | $0.0000012394 | $1.23             | <font color="red">+619</font>      |
| 8   | updateRecord   | 16_854_551   | 7_331_820 | $0.0000097489 | $9.74             | <font color="green">-46_493</font> |
| 9   | updateReserved | 1_020_329    | 998_131   | $0.0000013272 | $1.32             | <font color="red">+4_753</font>    |
| 10  | updateString   | 1_276_291    | 1_100_516 | $0.0000014633 | $1.46             | <font color="red">+575</font>      |
| 11  | updateVariant  | 4_382_963    | 2_343_185 | $0.0000031157 | $3.11             | <font color="green">-521</font>    |
| 12  | updateFloat32  | 1_031_077    | 1_002_430 | $0.0000013329 | $1.33             | <font color="red">+1_683</font>    |
| 13  | replyRaw       | 456_270      | 772_508   | $0.0000010272 | $1.02             | <font color="red">+76</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 668_805      | 857_522   | $0.0000011402 | $1.14             |
| 1   | manualUpdate   | 1_614_537    | 1_235_814 | $0.0000016432 | $1.64             |
| 2   | updateBlob     | 1_485_596    | 1_184_238 | $0.0000015746 | $1.57             |
| 3   | updateFloat32  | 1_030_960    | 1_002_384 | $0.0000013328 | $1.33             |
| 4   | updateInt8     | 1_125_779    | 1_040_311 | $0.0000013833 | $1.38             |
| 5   | updateNat      | 1_525_664    | 1_200_265 | $0.0000015960 | $1.59             |
| 6   | updateNull     | 1_016_510    | 996_604   | $0.0000013252 | $1.32             |
| 7   | updateVoid     | 854_602      | 931_840   | $0.0000012390 | $1.23             |
| 8   | updateRecord   | 16_901_044   | 7_350_417 | $0.0000097736 | $9.77             |
| 9   | updateReserved | 1_015_576    | 996_230   | $0.0000013247 | $1.32             |
| 10  | updateString   | 1_275_716    | 1_100_286 | $0.0000014630 | $1.46             |
| 11  | updateVariant  | 4_383_484    | 2_343_393 | $0.0000031159 | $3.11             |
| 12  | updateFloat32  | 1_029_394    | 1_001_757 | $0.0000013320 | $1.33             |
| 13  | replyRaw       | 456_194      | 772_477   | $0.0000010271 | $1.02             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
