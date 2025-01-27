# Benchmarks for superheroes

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | create      | 3_887_961    | 2_145_184 | $0.0000028524 | $2.85             | <font color="red">+225_781</font> |
| 1   | create      | 4_974_035    | 2_579_614 | $0.0000034300 | $3.43             | <font color="red">+254_256</font> |
| 2   | update      | 5_308_889    | 2_713_555 | $0.0000036081 | $3.60             | <font color="red">+235_904</font> |
| 3   | update      | 3_740_897    | 2_086_358 | $0.0000027742 | $2.77             | <font color="red">+179_094</font> |
| 4   | deleteHero  | 1_293_707    | 1_107_482 | $0.0000014726 | $1.47             | <font color="red">+71_865</font>  |
| 5   | deleteHero  | 1_279_125    | 1_101_650 | $0.0000014648 | $1.46             | <font color="red">+72_096</font>  |

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
