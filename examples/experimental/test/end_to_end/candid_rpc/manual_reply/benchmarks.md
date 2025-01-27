# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | manualUpdate   | 674_770      | 859_908   | $0.0000011434 | $1.14             | <font color="red">+5_965</font>  |
| 1   | manualUpdate   | 1_619_115    | 1_237_646 | $0.0000016457 | $1.64             | <font color="red">+4_578</font>  |
| 2   | updateBlob     | 1_492_931    | 1_187_172 | $0.0000015785 | $1.57             | <font color="red">+7_335</font>  |
| 3   | updateFloat32  | 1_035_378    | 1_004_151 | $0.0000013352 | $1.33             | <font color="red">+4_418</font>  |
| 4   | updateInt8     | 1_133_371    | 1_043_348 | $0.0000013873 | $1.38             | <font color="red">+7_592</font>  |
| 5   | updateNat      | 1_529_751    | 1_201_900 | $0.0000015981 | $1.59             | <font color="red">+4_087</font>  |
| 6   | updateNull     | 1_022_684    | 999_073   | $0.0000013284 | $1.32             | <font color="red">+6_174</font>  |
| 7   | updateVoid     | 859_351      | 933_740   | $0.0000012416 | $1.24             | <font color="red">+4_749</font>  |
| 8   | updateRecord   | 16_918_493   | 7_357_397 | $0.0000097829 | $9.78             | <font color="red">+17_449</font> |
| 9   | updateReserved | 1_023_084    | 999_233   | $0.0000013287 | $1.32             | <font color="red">+7_508</font>  |
| 10  | updateString   | 1_280_870    | 1_102_348 | $0.0000014658 | $1.46             | <font color="red">+5_154</font>  |
| 11  | updateVariant  | 4_396_584    | 2_348_633 | $0.0000031229 | $3.12             | <font color="red">+13_100</font> |
| 12  | updateFloat32  | 1_036_694    | 1_004_677 | $0.0000013359 | $1.33             | <font color="red">+7_300</font>  |
| 13  | replyRaw       | 455_319      | 772_127   | $0.0000010267 | $1.02             | <font color="green">-875</font>  |

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
