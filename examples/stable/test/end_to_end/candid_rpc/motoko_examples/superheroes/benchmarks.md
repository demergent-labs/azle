# Benchmarks for superheroes

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | create      | 3_632_331    | 2_042_932 | $0.0000027164 | $2.71             | <font color="green">-29_849</font>  |
| 1   | create      | 4_639_132    | 2_445_652 | $0.0000032519 | $3.25             | <font color="green">-80_647</font>  |
| 2   | update      | 4_962_786    | 2_575_114 | $0.0000034241 | $3.42             | <font color="green">-110_199</font> |
| 3   | update      | 3_524_602    | 1_999_840 | $0.0000026591 | $2.65             | <font color="green">-37_201</font>  |
| 4   | deleteHero  | 1_223_552    | 1_079_420 | $0.0000014353 | $1.43             | <font color="red">+1_710</font>     |
| 5   | deleteHero  | 1_207_123    | 1_072_849 | $0.0000014265 | $1.42             | <font color="red">+94</font>        |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 3_662_180    | 2_054_872 | $0.0000027323 | $2.73             |
| 1   | create      | 4_719_779    | 2_477_911 | $0.0000032948 | $3.29             |
| 2   | update      | 5_072_985    | 2_619_194 | $0.0000034827 | $3.48             |
| 3   | update      | 3_561_803    | 2_014_721 | $0.0000026789 | $2.67             |
| 4   | deleteHero  | 1_221_842    | 1_078_736 | $0.0000014344 | $1.43             |
| 5   | deleteHero  | 1_207_029    | 1_072_811 | $0.0000014265 | $1.42             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
