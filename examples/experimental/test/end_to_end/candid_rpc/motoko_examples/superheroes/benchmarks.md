# Benchmarks for superheroes

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | create      | 4_464_209    | 2_375_683 | $0.0000031589 | $3.15             | <font color="green">-16_523</font> |
| 1   | create      | 5_770_046    | 2_898_018 | $0.0000038534 | $3.85             | <font color="green">-11_674</font> |
| 2   | update      | 6_210_861    | 3_074_344 | $0.0000040879 | $4.08             | <font color="green">-2_150</font>  |
| 3   | update      | 4_395_208    | 2_348_083 | $0.0000031222 | $3.12             | <font color="green">-1_767</font>  |
| 4   | deleteHero  | 1_220_028    | 1_078_011 | $0.0000014334 | $1.43             | <font color="green">-3_054</font>  |
| 5   | deleteHero  | 1_211_339    | 1_074_535 | $0.0000014288 | $1.42             | <font color="green">-743</font>    |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_480_732    | 2_382_292 | $0.0000031677 | $3.16             |
| 1   | create      | 5_781_720    | 2_902_688 | $0.0000038596 | $3.85             |
| 2   | update      | 6_213_011    | 3_075_204 | $0.0000040890 | $4.08             |
| 3   | update      | 4_396_975    | 2_348_790 | $0.0000031231 | $3.12             |
| 4   | deleteHero  | 1_223_082    | 1_079_232 | $0.0000014350 | $1.43             |
| 5   | deleteHero  | 1_212_082    | 1_074_832 | $0.0000014292 | $1.42             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
