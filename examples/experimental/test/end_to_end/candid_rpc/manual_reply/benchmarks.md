# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | manualUpdate   | 669_818      | 857_927   | $0.0000011408 | $1.14             | <font color="red">+1_013</font>    |
| 1   | manualUpdate   | 1_622_412    | 1_238_964 | $0.0000016474 | $1.64             | <font color="red">+7_875</font>    |
| 2   | updateBlob     | 1_491_194    | 1_186_477 | $0.0000015776 | $1.57             | <font color="red">+5_598</font>    |
| 3   | updateFloat32  | 1_034_860    | 1_003_944 | $0.0000013349 | $1.33             | <font color="red">+3_900</font>    |
| 4   | updateInt8     | 1_128_946    | 1_041_578 | $0.0000013850 | $1.38             | <font color="red">+3_167</font>    |
| 5   | updateNat      | 1_527_767    | 1_201_106 | $0.0000015971 | $1.59             | <font color="red">+2_103</font>    |
| 6   | updateNull     | 1_021_323    | 998_529   | $0.0000013277 | $1.32             | <font color="red">+4_813</font>    |
| 7   | updateVoid     | 857_637      | 933_054   | $0.0000012407 | $1.24             | <font color="red">+3_035</font>    |
| 8   | updateRecord   | 16_869_876   | 7_337_950 | $0.0000097571 | $9.75             | <font color="green">-31_168</font> |
| 9   | updateReserved | 1_023_266    | 999_306   | $0.0000013287 | $1.32             | <font color="red">+7_690</font>    |
| 10  | updateString   | 1_279_154    | 1_101_661 | $0.0000014648 | $1.46             | <font color="red">+3_438</font>    |
| 11  | updateVariant  | 4_383_654    | 2_343_461 | $0.0000031160 | $3.11             | <font color="red">+170</font>      |
| 12  | updateFloat32  | 1_034_967    | 1_003_986 | $0.0000013350 | $1.33             | <font color="red">+5_573</font>    |
| 13  | replyRaw       | 457_282      | 772_912   | $0.0000010277 | $1.02             | <font color="red">+1_088</font>    |

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
