# Benchmarks for superheroes

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | create      | 3_738_382    | 2_085_352 | $0.0000027728 | $2.77             | <font color="green">-6_816</font> |
| 1   | create      | 4_815_056    | 2_516_022 | $0.0000033455 | $3.34             | <font color="red">+6_137</font>   |
| 2   | update      | 5_159_286    | 2_653_714 | $0.0000035286 | $3.52             | <font color="red">+1_389</font>   |
| 3   | update      | 3_608_077    | 2_033_230 | $0.0000027035 | $2.70             | <font color="red">+9_311</font>   |
| 4   | deleteHero  | 1_277_431    | 1_100_972 | $0.0000014639 | $1.46             | <font color="red">+326</font>     |
| 5   | deleteHero  | 1_263_579    | 1_095_431 | $0.0000014566 | $1.45             | <font color="green">-244</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 3_745_198    | 2_088_079 | $0.0000027765 | $2.77             |
| 1   | create      | 4_808_919    | 2_513_567 | $0.0000033422 | $3.34             |
| 2   | update      | 5_157_897    | 2_653_158 | $0.0000035278 | $3.52             |
| 3   | update      | 3_598_766    | 2_029_506 | $0.0000026986 | $2.69             |
| 4   | deleteHero  | 1_277_105    | 1_100_842 | $0.0000014638 | $1.46             |
| 5   | deleteHero  | 1_263_823    | 1_095_529 | $0.0000014567 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
