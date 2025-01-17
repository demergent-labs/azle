# Benchmarks for superheroes

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | create      | 3_892_921    | 2_147_168 | $0.0000028550 | $2.85             | <font color="red">+230_741</font> |
| 1   | create      | 4_966_951    | 2_576_780 | $0.0000034263 | $3.42             | <font color="red">+247_172</font> |
| 2   | update      | 5_317_710    | 2_717_084 | $0.0000036128 | $3.61             | <font color="red">+244_725</font> |
| 3   | update      | 3_752_915    | 2_091_166 | $0.0000027806 | $2.78             | <font color="red">+191_112</font> |
| 4   | deleteHero  | 1_296_515    | 1_108_606 | $0.0000014741 | $1.47             | <font color="red">+74_673</font>  |
| 5   | deleteHero  | 1_281_999    | 1_102_799 | $0.0000014664 | $1.46             | <font color="red">+74_970</font>  |

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
