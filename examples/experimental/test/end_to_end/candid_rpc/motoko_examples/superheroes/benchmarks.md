# Benchmarks for superheroes

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | create      | 4_435_693    | 2_364_277 | $0.0000031437 | $3.14             | <font color="green">-13_922</font> |
| 1   | create      | 5_677_864    | 2_861_145 | $0.0000038044 | $3.80             | <font color="green">-14_526</font> |
| 2   | update      | 6_108_168    | 3_033_267 | $0.0000040332 | $4.03             | <font color="green">-4_850</font>  |
| 3   | update      | 4_375_722    | 2_340_288 | $0.0000031118 | $3.11             | <font color="red">+2_770</font>    |
| 4   | deleteHero  | 1_225_033    | 1_080_013 | $0.0000014361 | $1.43             | <font color="green">-3_292</font>  |
| 5   | deleteHero  | 1_216_713    | 1_076_685 | $0.0000014316 | $1.43             | <font color="green">-4_159</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_449_615    | 2_369_846 | $0.0000031511 | $3.15             |
| 1   | create      | 5_692_390    | 2_866_956 | $0.0000038121 | $3.81             |
| 2   | update      | 6_113_018    | 3_035_207 | $0.0000040358 | $4.03             |
| 3   | update      | 4_372_952    | 2_339_180 | $0.0000031103 | $3.11             |
| 4   | deleteHero  | 1_228_325    | 1_081_330 | $0.0000014378 | $1.43             |
| 5   | deleteHero  | 1_220_872    | 1_078_348 | $0.0000014338 | $1.43             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
