# Benchmarks for complex_types

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser     | 18_523_586   | 7_999_434  | $0.0000106366 | $10.63            | <font color="green">-403_786</font> |
| 1   | createThread   | 19_462_636   | 8_375_054  | $0.0000111361 | $11.13            | <font color="green">-632_792</font> |
| 2   | createPost     | 21_816_799   | 9_316_719  | $0.0000123882 | $12.38            | <font color="green">-647_877</font> |
| 3   | createReaction | 24_762_597   | 10_495_038 | $0.0000139549 | $13.95            | <font color="green">-677_527</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 18_927_372   | 8_160_948  | $0.0000108514 | $10.85            |
| 1   | createThread   | 20_095_428   | 8_628_171  | $0.0000114726 | $11.47            |
| 2   | createPost     | 22_464_676   | 9_575_870  | $0.0000127327 | $12.73            |
| 3   | createReaction | 25_440_124   | 10_766_049 | $0.0000143153 | $14.31            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
