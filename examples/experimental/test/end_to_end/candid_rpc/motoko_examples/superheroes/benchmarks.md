# Benchmarks for superheroes

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | create      | 4_472_235    | 2_378_894 | $0.0000031631 | $3.16             | <font color="red">+8_026</font>  |
| 1   | create      | 5_778_278    | 2_901_311 | $0.0000038578 | $3.85             | <font color="red">+8_232</font>  |
| 2   | update      | 6_212_425    | 3_074_970 | $0.0000040887 | $4.08             | <font color="red">+1_564</font>  |
| 3   | update      | 4_407_642    | 2_353_056 | $0.0000031288 | $3.12             | <font color="red">+12_434</font> |
| 4   | deleteHero  | 1_223_162    | 1_079_264 | $0.0000014351 | $1.43             | <font color="red">+3_134</font>  |
| 5   | deleteHero  | 1_215_920    | 1_076_368 | $0.0000014312 | $1.43             | <font color="red">+4_581</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_464_209    | 2_375_683 | $0.0000031589 | $3.15             |
| 1   | create      | 5_770_046    | 2_898_018 | $0.0000038534 | $3.85             |
| 2   | update      | 6_210_861    | 3_074_344 | $0.0000040879 | $4.08             |
| 3   | update      | 4_395_208    | 2_348_083 | $0.0000031222 | $3.12             |
| 4   | deleteHero  | 1_220_028    | 1_078_011 | $0.0000014334 | $1.43             |
| 5   | deleteHero  | 1_211_339    | 1_074_535 | $0.0000014288 | $1.42             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
