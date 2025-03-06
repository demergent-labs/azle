# Benchmarks for superheroes

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | create      | 4_438_106    | 2_365_242 | $0.0000031450 | $3.14             | <font color="green">-11_509</font> |
| 1   | create      | 5_687_431    | 2_864_972 | $0.0000038095 | $3.80             | <font color="green">-4_959</font>  |
| 2   | update      | 6_103_429    | 3_031_371 | $0.0000040307 | $4.03             | <font color="green">-9_589</font>  |
| 3   | update      | 4_373_782    | 2_339_512 | $0.0000031108 | $3.11             | <font color="red">+830</font>      |
| 4   | deleteHero  | 1_231_798    | 1_082_719 | $0.0000014397 | $1.43             | <font color="red">+3_473</font>    |
| 5   | deleteHero  | 1_222_837    | 1_079_134 | $0.0000014349 | $1.43             | <font color="red">+1_965</font>    |

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
