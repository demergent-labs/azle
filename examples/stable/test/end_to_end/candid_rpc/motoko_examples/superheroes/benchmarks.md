# Benchmarks for superheroes

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | create      | 3_742_886    | 2_087_154 | $0.0000027752 | $2.77             | <font color="green">-1_266</font> |
| 1   | create      | 4_829_065    | 2_521_626 | $0.0000033529 | $3.35             | <font color="red">+19_067</font>  |
| 2   | update      | 5_183_628    | 2_663_451 | $0.0000035415 | $3.54             | <font color="red">+24_614</font>  |
| 3   | update      | 3_611_619    | 2_034_647 | $0.0000027054 | $2.70             | <font color="red">+2_474</font>   |
| 4   | deleteHero  | 1_275_805    | 1_100_322 | $0.0000014631 | $1.46             | <font color="green">-3_866</font> |
| 5   | deleteHero  | 1_265_755    | 1_096_302 | $0.0000014577 | $1.45             | <font color="red">+1_394</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 3_744_152    | 2_087_660 | $0.0000027759 | $2.77             |
| 1   | create      | 4_809_998    | 2_513_999 | $0.0000033428 | $3.34             |
| 2   | update      | 5_159_014    | 2_653_605 | $0.0000035284 | $3.52             |
| 3   | update      | 3_609_145    | 2_033_658 | $0.0000027041 | $2.70             |
| 4   | deleteHero  | 1_279_671    | 1_101_868 | $0.0000014651 | $1.46             |
| 5   | deleteHero  | 1_264_361    | 1_095_744 | $0.0000014570 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
