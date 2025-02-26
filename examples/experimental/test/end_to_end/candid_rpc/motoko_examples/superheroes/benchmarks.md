# Benchmarks for superheroes

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | create      | 4_449_615    | 2_369_846 | $0.0000031511 | $3.15             | <font color="green">-3_316</font> |
| 1   | create      | 5_692_390    | 2_866_956 | $0.0000038121 | $3.81             | <font color="green">-9_099</font> |
| 2   | update      | 6_113_018    | 3_035_207 | $0.0000040358 | $4.03             | <font color="red">+39</font>      |
| 3   | update      | 4_372_952    | 2_339_180 | $0.0000031103 | $3.11             | <font color="green">-3_901</font> |
| 4   | deleteHero  | 1_228_325    | 1_081_330 | $0.0000014378 | $1.43             | <font color="green">-3_945</font> |
| 5   | deleteHero  | 1_220_872    | 1_078_348 | $0.0000014338 | $1.43             | <font color="green">-1_910</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_452_931    | 2_371_172 | $0.0000031529 | $3.15             |
| 1   | create      | 5_701_489    | 2_870_595 | $0.0000038169 | $3.81             |
| 2   | update      | 6_112_979    | 3_035_191 | $0.0000040358 | $4.03             |
| 3   | update      | 4_376_853    | 2_340_741 | $0.0000031124 | $3.11             |
| 4   | deleteHero  | 1_232_270    | 1_082_908 | $0.0000014399 | $1.43             |
| 5   | deleteHero  | 1_222_782    | 1_079_112 | $0.0000014349 | $1.43             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
